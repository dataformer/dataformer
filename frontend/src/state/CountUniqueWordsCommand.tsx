import React from "react";
import { Command } from "./Command";
import CountUniqueWordsCommandContent from "../components/pipeline/commands/CountUniqueWordsCommandContent";

export class CountUniqueWordsCommand implements Command {
  private readonly label = "Count Unique Words";
  private readonly component = (
    <CountUniqueWordsCommandContent label={this.label} />
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
    return new CountUniqueWordsCommand(!this.isEnabled);
  }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return `
def count_unique_words(text):
    return len(set(text.replace('.', '').replace(',', '').replace('?', '').replace('!', '').replace(';', '').replace('(', '').replace(')', '').split(' ')))
    
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
