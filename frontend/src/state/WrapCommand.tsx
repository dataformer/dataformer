import React from "react";
import WrapCommandContent from "../components/pipeline/commands/WrapCommandContent";
import { Command } from "./Command";

export class WrapCommand implements Command {
  // private readonly scriptTemplate: string = "grep/sed/awk | something | something else"

  private readonly label = "Wrap";
  private readonly component = (<WrapCommandContent label={this.label} />);

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
    return that instanceof WrapCommand;
  }

  public toString(): string {
    this.checkRep();

    return `This is a Wrap command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}
