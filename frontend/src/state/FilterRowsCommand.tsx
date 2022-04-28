import React from "react";
import { Command } from "./Command";
import FilterRowsCommandContent from "../components/pipeline/commands/FilterRowsCommandContent";

export class FilterRowsCommand implements Command {
  // private readonly scriptTemplate: string = "grep/sed/awk | something | something else"

  private readonly label = "Filter Rows";
  private readonly component = (
    <FilterRowsCommandContent label={this.label} />
  );

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
  public getComponent(): JSX.Element {
    return this.component;
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
