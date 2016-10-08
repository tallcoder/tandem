import { SyntheticDOMElement } from "@tandem/synthetic-browser";
import { BaseEditorTool, IEditorTool, IEditor } from "@tandem/editor/models";
import { MouseAction, SetToolAction, SelectAction } from "@tandem/editor/actions";
import {
  Action,
  IActor,
  inject,
  Service,
  startDrag,
  MAIN_BUS_NS,
  BoundingRect,
  EntityFactoryDependency,
} from "@tandem/common";


export abstract class InsertTool extends BaseEditorTool {

  readonly cursor: string = "crosshair";
  readonly name: string =  "insert";
  public entityIsRoot: boolean = false;

  @inject(MAIN_BUS_NS)
  readonly bus: IActor;

  readonly resizable: boolean = true;

  didInject() {

    // deselect all
    this.bus.execute(new SelectAction());
  }

  abstract createSyntheticDOMElement(): SyntheticDOMElement;
  abstract get displayEntityToolFactory(): { create(editor: IEditor): IEditorTool }
}