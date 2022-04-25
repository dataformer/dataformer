import { Command } from "./Command";

export class FilterRowsCommand implements Command {
  // private readonly scriptTemplate: string = "grep/sed/awk | something | something else"

  private readonly label = "Filter Rows";

  constructor() {
    this.checkRep();
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
  public generateScript(): string {
    // TODO - populate script here
    return "";
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return that instanceof FilterRowsCommand;
  }

  public toString(): string {
    this.checkRep();

    return `This is a Filter Rows command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}