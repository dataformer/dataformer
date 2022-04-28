import React from "react";
import { Command } from "./Command";
import FilterColsCommandContent from "../components/pipeline/commands/FilterColsCommandContent";

export class FilterColsCommand implements Command {
  // private readonly scriptTemplate: string = "grep/sed/awk | something | something else"

  private readonly label = "Filter Columns";
  private readonly component = (
    <FilterColsCommandContent label={this.label} />
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
  public getComponent() {
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
    return that instanceof FilterColsCommand;
  }

  public toString(): string {
    this.checkRep();

    return `This is a Filter Columns command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}
