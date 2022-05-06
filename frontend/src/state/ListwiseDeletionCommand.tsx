import React from "react";
import { Command } from "./Command";
import ListwiseDeletionCommandContent from "../components/pipeline/commands/ListwiseDeletionCommandContent";

export class ListwiseDeletionCommand implements Command {
  private readonly label = "Listwise Deletion";
  private readonly component = (
    <ListwiseDeletionCommandContent label={this.label} />
  );

  constructor(private readonly isEnabled: boolean, private readonly id: number) {
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
      return new ListwiseDeletionCommand(!this.isEnabled, this.getId());
    }

  /**
   * @inheritdoc
   */
  public generateScript(): string {
    return `
import pandas as pd
from io import StringIO

def listwise_deletion(text):
    # Load the data into a Pandas dataframe
    text_io = StringIO(text)
    df = pd.read_csv(text_io)
    df = df.infer_objects()

    # Drop all rows with missing values
    df = df.dropna()

    # Return the result as a CSV
    return df.to_csv(index=False)

text = listwise_deletion(text)
`;
  }

  public equalValue(that: Command): boolean {
    this.checkRep();
    return this.getId() === that.getId();
  }

  public toString(): string {
    this.checkRep();

    return `This is a Listwise Deletion command with script template ${this.generateScript()}`;
  }

  private checkRep(): void {}
}
