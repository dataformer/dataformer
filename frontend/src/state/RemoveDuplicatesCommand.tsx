import React from "react";
import { Command } from "./Command";
import RemoveDuplicatesCommandContent from "../components/pipeline/commands/RemoveDuplicatesCommandContent";

export class RemoveDuplicatesCommand implements Command {
  private readonly label = "Remove Duplicate Lines";
  private readonly component = (
    <RemoveDuplicatesCommandContent label={this.label} />
  );
  private readonly id = Math.floor(Math.random() * 100000);

  constructor(public readonly isEnabled = true) {
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
    return new RemoveDuplicatesCommand(!this.isEnabled);
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return `
def remove_duplicate_lines(text):
    unique_lines = []
    lines = text.splitlines()
    for line in lines:
        if line not in unique_lines:
            unique_lines.append(line)
    return """\n""".join(unique_lines)
    
text = remove_duplicate_lines(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is a Remove Duplicate command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}
