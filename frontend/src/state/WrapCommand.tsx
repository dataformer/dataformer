import React from "react";
import WrapCommandContent from "../components/pipeline/commands/WrapCommandContent";
import { Command } from "./Command";

interface WrapCommandArguments {
  headerField: string;
  separator: string;
}

export class WrapCommand implements Command {
  // private readonly scriptTemplate: string = "grep/sed/awk | something | something else"

  private readonly label = "Wrap";
  private arguments: WrapCommandArguments = { headerField: "", separator: "" };
  private readonly component = (
    <WrapCommandContent
      label={this.label}
      onArgumentsChange={(newArguments: WrapCommandArguments) =>
        (this.arguments = newArguments)
      }
    />
  );
  private readonly id = Math.floor(Math.random() * 100000);

  constructor(private readonly isEnabled = true) {
    this.checkRep();
  }

  /**
   * @inheritdoc
   */
  public getId(): number {
    return this.id;
  }

  /**
   * @inheritdoc
   */
  public getLabel(): string {
    return this.label;
  }

  /**
   * @inheritdoc
   */
  public getComponent(): JSX.Element {
    return this.component;
  }

  /**
   * @inheritdoc
   */
  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * @inheritdoc
   */
  public getToggledCommand(): Command {
    return new WrapCommand(!this.isEnabled);
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    // TODO: Handle special characters (mainly ') in arguments
    return `
def wrap_command(text):
  lines = text.splitlines()

  # Define the field marking new record and the separator
  initial_field = "${this.arguments.headerField}"
  separator = "${this.arguments.separator}"

  # Initialize the data structures for tracking encountered
  # records
  encountered_fields = []
  records = []

  current_record = {}
  for line in lines:
    if separator not in line:
      # No record to process
      continue

    if line.startswith(initial_field) and current_record:
      # Encountered a new record
      records.append(current_record)
      current_record = {}
    field_name, value = line.split(separator, 1)

    # Trim superfluous whitespace
    field_name = field_name.strip()
    value = value.strip()

    # Skip the current data item if field or value is empty
    if not field_name or not value:
      continue

    if field_name not in encountered_fields:
      encountered_fields.append(field_name)
    current_record[field_name] = value
  if current_record:
    # Add the last record in the file
    records.append(current_record)

  output = [",".join(encountered_fields)]
  for record in records:
    output.append(",".join([
      record[field] if field in record else ""
      for field in encountered_fields
    ]))

  return """\n""".join(output)

text = wrap_command(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is a Wrap command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}
