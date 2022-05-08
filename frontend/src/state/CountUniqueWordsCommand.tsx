import React from "react";
import { Command } from "./Command";
import CountUniqueWordsCommandContent from "../components/pipeline/commands/CountUniqueWordsCommandContent";

export class CountUniqueWordsCommand implements Command {
  private readonly label = "Count Unique Words";
  private readonly component = (
    <CountUniqueWordsCommandContent label={this.label} />
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
    return new CountUniqueWordsCommand(!this.isEnabled, this.getId());
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return `
def count_unique_words(text):
    import string
    for character in string.punctuation:
      text = text.replace(character, '')
    text = text.replace('"', "'")
    return len(set(text.split()))
    
text = count_unique_words(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is a Count Unique Words command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}
