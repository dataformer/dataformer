import React from "react";
import { Command } from "./Command";
import RemoveHeaderCommandContent from "../components/pipeline/commands/RemoveHeaderCommandContent";

export class RemoveHeaderCommand implements Command {
  private readonly label = "Remove header row";
  private readonly component = (
    <RemoveHeaderCommandContent label={this.label} />
  );
  private readonly isEnabled;
  private readonly id;

  constructor(isEnabled: boolean, id: number) {
    this.checkRep();
    this.isEnabled = isEnabled;
    this.id = id;
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
    return new RemoveHeaderCommand(!this.isEnabled, this.getId());
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return `
def remove_header(text):
    if text == "":
      return text
    lines = text.splitlines()
    return """\n""".join(lines[1:])
text = remove_header(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is a Remove Header command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}
