import { Action } from "redux";
import * as path from "path";
import { xmlToPCNode } from "../utils/paperclip";
import {
  CanvasToolArtboardTitleClicked,
  NEW_FILE_ADDED,
  CANVAS_TOOL_ARTBOARD_TITLE_CLICKED,
  CanvasToolOverlayMouseMoved,
  PROJECT_DIRECTORY_LOADED,
  ProjectDirectoryLoaded,
  FILE_NAVIGATOR_ITEM_CLICKED,
  FileNavigatorItemClicked,
  CANVAS_WHEEL,
  CANVAS_MOUSE_MOVED,
  CANVAS_MOUNTED,
  CANVAS_MOUSE_CLICKED,
  CanvasToolOverlayClicked,
  RESIZER_MOUSE_DOWN,
  ResizerMouseDown,
  ResizerMoved,
  RESIZER_MOVED,
  RESIZER_PATH_MOUSE_STOPPED_MOVING,
  RESIZER_STOPPED_MOVING,
  ResizerPathStoppedMoving,
  RESIZER_PATH_MOUSE_MOVED,
  ResizerPathMoved,
  SHORTCUT_ESCAPE_KEY_DOWN,
  INSERT_TOOL_FINISHED,
  InsertToolFinished,
  SHORTCUT_DELETE_KEY_DOWN,
  CANVAS_TOOL_WINDOW_BACKGROUND_CLICKED,
  SYNTHETIC_NODES_PASTED,
  SyntheticVisibleNodesPasted,
  FILE_NAVIGATOR_ITEM_DOUBLE_CLICKED,
  OPEN_FILE_ITEM_CLICKED,
  OPEN_FILE_ITEM_CLOSE_CLICKED,
  OpenFilesItemClick,
  SAVED_FILE,
  SavedFile,
  SAVED_ALL_FILES,
  RAW_CSS_TEXT_CHANGED,
  RawCSSTextChanged,
  TreeLayerLabelChanged,
  TreeLayerClick,
  TreeLayerExpandToggleClick,
  FILE_NAVIGATOR_TOGGLE_DIRECTORY_CLICKED,
  TreeLayerMouseOver,
  FILE_NAVIGATOR_NEW_FILE_CLICKED,
  FILE_NAVIGATOR_NEW_DIRECTORY_CLICKED,
  NewFileAdded,
  FILE_NAVIGATOR_DROPPED_ITEM,
  FileNavigatorDroppedItem,
  SHORTCUT_UNDO_KEY_DOWN,
  SHORTCUT_REDO_KEY_DOWN,
  TEXT_VALUE_CHANGED,
  TextValueChanged,
  ElementTypeChanged,
  SHORTCUT_QUICK_SEARCH_KEY_DOWN,
  QUICK_SEARCH_ITEM_CLICKED,
  QuickSearchItemClicked,
  QUICK_SEARCH_BACKGROUND_CLICK,
  COMPONENT_VARIANT_NAME_CLICKED,
  ComponentVariantNameClicked,
  EDITOR_TAB_CLICKED,
  EditorTabClicked,
  CanvasWheel,
  SHORTCUT_ZOOM_IN_KEY_DOWN,
  SHORTCUT_ZOOM_OUT_KEY_DOWN,
  CanvasMounted,
  CANVAS_DROPPED_ITEM,
  CanvasDroppedItem,
  CANVAS_DRAGGED_OVER,
  SHORTCUT_CONVERT_TO_COMPONENT_KEY_DOWN,
  SHORTCUT_T_KEY_DOWN,
  SHORTCUT_R_KEY_DOWN,
  CanvasDraggingOver,
  ELEMENT_TYPE_CHANGED,
  CSS_PROPERTY_CHANGED,
  CSS_PROPERTY_CHANGE_COMPLETED,
  ATTRIBUTE_CHANGED,
  CSSPropertyChanged,
  FRAME_MODE_CHANGE_COMPLETE,
  FrameModeChangeComplete,
  TOOLBAR_TOOL_CLICKED,
  ToolbarToolClicked,
  EDITOR_TAB_CLOSE_BUTTON_CLICKED,
  SHORTCUT_SELECT_NEXT_TAB,
  SHORTCUT_SELECT_PREVIOUS_TAB,
  SHORTCUT_CLOSE_CURRENT_TAB,
  COMPONENT_PICKER_BACKGROUND_CLICK,
  ComponentPickerItemClick,
  COMPONENT_PICKER_ITEM_CLICK,
  SHORTCUT_C_KEY_DOWN,
  ADD_VARIANT_BUTTON_CLICKED,
  VARIANT_DEFAULT_SWITCH_CLICKED,
  VariantDefaultSwitchClicked,
  VariantLabelChanged,
  VARIANT_LABEL_CHANGED,
  VARIANT_CLICKED,
  VariantClicked,
  REMOVE_VARIANT_BUTTON_CLICKED,
  COMPONENT_INSTANCE_VARIANT_TOGGLED,
  INSTANCE_VARIANT_RESET_CLICKED,
  SHORTCUT_TOGGLE_SIDEBAR,
  INHERIT_PANE_ADD_BUTTON_CLICK,
  INHERIT_PANE_REMOVE_BUTTON_CLICK,
  InheritPaneItemClick,
  INHERIT_ITEM_COMPONENT_TYPE_CHANGE_COMPLETE,
  InheritItemComponentTypeChangeComplete,
  INHERIT_ITEM_CLICK,
  InheritItemClick,
  CANVAS_MOUSE_DOUBLE_CLICKED,
  CanvasMouseMoved,
  ComponentControllerItemClicked,
  COMPONENT_CONTROLLER_PICKED,
  ComponentControllerPicked,
  SHORTCUT_WRAP_IN_SLOT_KEY_DOWN,
  REMOVE_COMPONENT_CONTROLLER_BUTTON_CLICKED,
  SOURCE_INSPECTOR_LAYER_CLICKED,
  InspectorLayerEvent,
  SOURCE_INSPECTOR_LAYER_ARROW_CLICKED,
  SOURCE_INSPECTOR_LAYER_LABEL_CHANGED,
  InspectorLayerLabelChanged,
  SOURCE_INSPECTOR_LAYER_DROPPED,
  SourceInspectorLayerDropped,
  RemoveComponentControllerButtonClicked,
  InheritPaneRemoveButtonClick
} from "../actions";
import {
  queueOpenFile,
  fsSandboxReducer,
  isImageUri,
  hasFileCacheItem,
  FS_SANDBOX_ITEM_LOADED,
  FSSandboxItemLoaded,
  isSvgUri
} from "fsbox";
import {
  RootState,
  updateRootState,
  updateOpenFileCanvas,
  getCanvasMouseTargetNodeId,
  setSelectedSyntheticVisibleNodeIds,
  getSelectionBounds,
  getBoundedSelection,
  ToolType,
  setTool,
  persistRootState,
  getOpenFile,
  openFile,
  removeTemporaryOpenFiles,
  setNextOpenFile,
  updateOpenFile,
  deselectRootProjectFiles,
  setHoveringSyntheticVisibleNodeIds,
  setRootStateSyntheticVisibleNodeExpanded,
  setSelectedFileNodeIds,
  InsertFileType,
  setInsertFile,
  undo,
  redo,
  getEditorWithActiveFileUri,
  getActiveEditorWindow,
  getEditorWindowWithFileUri,
  updateEditorWindow,
  centerEditorCanvas,
  getCanvasMouseTargetNodeIdFromPoint,
  isSelectionMovable,
  selectInsertedSyntheticVisibleNodes,
  RegisteredComponent,
  closeFile,
  queueSelectInsertedSyntheticVisibleNodes,
  shiftActiveEditorTab,
  confirm,
  ConfirmType,
  openSyntheticVisibleNodeOriginFile,
  updateSourceInspectorNode,
  pruneStaleSyntheticNodes,
  getInsertableSourceNodeScope,
  getInsertableSourceNodeFromSyntheticNode,
  getCanvasMouseTargetInspectorNode,
  setHoveringInspectorNodeIds,
  refreshModuleInspectorNodes
} from "../state";
import {
  PCSourceTagNames,
  PCVisibleNode,
  paperclipReducer,
  SyntheticElement,
  createPCElement,
  createPCTextNode,
  getSyntheticVisibleNodeRelativeBounds,
  getSyntheticVisibleNodeDocument,
  getSyntheticSourceNode,
  getSyntheticNodeById,
  SyntheticVisibleNode,
  getPCNodeDependency,
  updateSyntheticVisibleNodePosition,
  updateSyntheticVisibleNodeBounds,
  persistInsertNode,
  persistChangeLabel,
  persistSyntheticVisibleNodeBounds,
  persistRemoveSyntheticVisibleNode,
  getSyntheticNodeSourceDependency,
  persistConvertNodeToComponent,
  persistMoveSyntheticVisibleNode,
  persistAppendPCClips,
  persistChangeSyntheticTextNodeValue,
  persistRawCSSText,
  SyntheticTextNode,
  updatePCNodeMetadata,
  PCVisibleNodeMetadataKey,
  getSyntheticDocumentByDependencyUri,
  getFrameSyntheticNode,
  SyntheticDocument,
  PC_DEPENDENCY_GRAPH_LOADED,
  PCDependencyGraphLoaded,
  SYNTHETIC_DOCUMENT_NODE_NAME,
  DEFAULT_FRAME_BOUNDS,
  isSyntheticVisibleNode,
  persistChangeElementType,
  persistAddComponentController,
  persistRemoveComponentController,
  PC_RUNTIME_EVALUATED,
  persistCSSProperty,
  persistAttribute,
  getPCNode,
  persistSyntheticNodeMetadata,
  createPCComponentInstance,
  getSyntheticVisibleNodeFrame,
  persistAddVariant,
  persistUpdateVariant,
  persistRemoveVariant,
  SyntheticInstanceElement,
  persistToggleVariantDefault,
  persistRemoveVariantOverride,
  getPCVariants,
  canRemoveSyntheticVisibleNode,
  persistInheritStyle,
  persistInheritStyleComponentId,
  isPaperclipUri,
  syntheticNodeIsInShadow,
  getSyntheticContentNode,
  PCOverridablePropertyName,
  getSyntheticInstancePath,
  PCComponentInstanceElement,
  persistWrapInSlot,
  getPCNodeModule,
  getPCNodeContentNode,
  PCNode,
  isPCPlug,
  createPCPlug,
  persistRemovePCNode,
  getInstanceSlotContent,
  SyntheticNode,
  PCSlot,
  DependencyGraph,
  canRemovePCNode,
  isVisibleNode,
  persistSyntheticVisibleNodeStyle,
  removeSyntheticVisibleNode,
  isSyntheticContentNode,
  getSyntheticDocumentDependencyUri,
  getAllParentComponentInstance,
  PCComponent,
  extendsComponent
} from "paperclip";
import {
  roundBounds,
  scaleInnerBounds,
  moveBounds,
  keepBoundsAspectRatio,
  keepBoundsCenter,
  Bounds,
  shiftBounds,
  isDirectory,
  updateNestedNode,
  Directory,
  isFile,
  getParentTreeNode,
  appendChildNode,
  removeNestedTreeNode,
  boundsFromRect,
  centerTransformZoom,
  Translate,
  zoomBounds,
  TreeMoveOffset,
  shiftPoint,
  Point,
  zoomPoint,
  cloneTreeNode,
  FSItemTagNames,
  FSItem,
  getFileFromUri,
  createFile,
  createDirectory,
  sortFSItems,
  EMPTY_OBJECT,
  getNestedTreeNodeById,
  EMPTY_ARRAY,
  containsNestedTreeNodeById
} from "tandem-common";
import { clamp, last } from "lodash";
import {
  expandInspectorNode,
  collapseInspectorNode,
  getInspectorSyntheticNode,
  isInspectorNode,
  getInspectorSourceNode,
  InspectorTreeNodeName,
  InspectorNode,
  inspectorNodeInShadow,
  getSyntheticInspectorNode
} from "../state/pc-inspector-tree";

const ZOOM_SENSITIVITY = process.platform === "win32" ? 2500 : 250;
const MIN_ZOOM = 0.02;
const MAX_ZOOM = 6400 / 100;

export const rootReducer = (state: RootState, action: Action): RootState => {
  state = fsSandboxReducer(state, action);
  state = paperclipReducer(state, action);
  state = canvasReducer(state, action);
  state = shortcutReducer(state, action);
  state = clipboardReducer(state, action);

  switch (action.type) {
    case PROJECT_DIRECTORY_LOADED: {
      const { directory } = action as ProjectDirectoryLoaded;
      return updateRootState(
        { projectDirectory: directory, ready: true },
        state
      );
    }
    case FILE_NAVIGATOR_ITEM_CLICKED: {
      const { node } = action as FileNavigatorItemClicked;
      const uri = node.uri;
      state = setSelectedFileNodeIds(state, node.id);
      state = setFileExpanded(node, true, state);

      if (!isDirectory(node)) {
        state = openFile(uri, true, false, state);
        return state;
      }

      return state;
    }
    case QUICK_SEARCH_ITEM_CLICKED: {
      const { file } = action as QuickSearchItemClicked;
      const uri = file.uri;
      state = openFile(uri, false, false, state);
      state = updateRootState({ showQuickSearch: false }, state);
      return state;
    }
    case QUICK_SEARCH_BACKGROUND_CLICK: {
      return (state = updateRootState({ showQuickSearch: false }, state));
    }
    case FILE_NAVIGATOR_TOGGLE_DIRECTORY_CLICKED: {
      const { node } = action as FileNavigatorItemClicked;
      state = setFileExpanded(node, !node.expanded, state);
      return state;
    }
    case FILE_NAVIGATOR_ITEM_DOUBLE_CLICKED: {
      const { node } = action as FileNavigatorItemClicked;
      const uri = node.uri;
      const file = getFileFromUri(uri, state.projectDirectory);
      if (isFile(file)) {
        state = openFile(uri, false, false, state);
      }

      return state;
    }
    case FILE_NAVIGATOR_NEW_FILE_CLICKED: {
      return setInsertFile(InsertFileType.FILE, state);
    }
    case FILE_NAVIGATOR_NEW_DIRECTORY_CLICKED: {
      return setInsertFile(InsertFileType.DIRECTORY, state);
    }

    case CANVAS_MOUNTED: {
      const { fileUri, element } = action as CanvasMounted;
      if (!element) {
        return state;
      }

      const { width = 400, height = 300 } =
        element.getBoundingClientRect() || {};

      state = updateEditorWindow(
        {
          container: element
        },
        fileUri,
        state
      );

      const selectedNodeId = state.selectedSyntheticNodeIds[0];
      if (selectedNodeId) {
        const document = getSyntheticDocumentByDependencyUri(
          fileUri,
          state.documents,
          state.graph
        );
        if (getNestedTreeNodeById(selectedNodeId, document)) {
          return centerEditorCanvas(
            state,
            fileUri,
            getSelectionBounds(
              state.selectedSyntheticNodeIds,
              state.documents,
              state.frames,
              state.graph
            )
          );
        }
      } else {
        return centerEditorCanvas(state, fileUri);
      }
    }

    case FILE_NAVIGATOR_DROPPED_ITEM: {
      const { node, targetNode } = action as FileNavigatorDroppedItem;
      const parent: Directory = getParentTreeNode(
        node.id,
        state.projectDirectory
      );
      const parentUri = parent.uri;
      const nodeUri = node.uri;
      state = updateRootState(
        {
          projectDirectory: updateNestedNode(
            parent,
            state.projectDirectory,
            parent => removeNestedTreeNode(node, parent)
          )
        },
        state
      );

      const targetDir: Directory =
        targetNode.name !== FSItemTagNames.FILE
          ? targetNode
          : getParentTreeNode(targetNode.id, state.projectDirectory);
      const targetUri = targetDir.uri;
      state = updateRootState(
        {
          projectDirectory: updateNestedNode(
            targetDir,
            state.projectDirectory,
            targetNode => {
              return appendChildNode(
                {
                  ...node,
                  uri: nodeUri.replace(parentUri, targetUri)
                } as FSItem,
                targetNode
              );
            }
          )
        },
        state
      );

      return state;
    }
    case NEW_FILE_ADDED: {
      const { uri, fileType } = action as NewFileAdded;
      const directory = getFileFromUri(
        path.dirname(uri),
        state.projectDirectory
      );

      state = updateRootState(
        {
          insertFileInfo: null,
          projectDirectory: updateNestedNode(
            directory,
            state.projectDirectory,
            dir => {
              return {
                ...dir,
                children: sortFSItems([
                  ...dir.children,
                  fileType === FSItemTagNames.FILE
                    ? createFile(uri)
                    : createDirectory(uri)
                ])
              };
            }
          )
        },
        state
      );

      if (fileType === FSItemTagNames.FILE && isPaperclipUri(uri)) {
        state = openFile(uri, false, false, state);
      }
      return state;
    }

    case FS_SANDBOX_ITEM_LOADED: {
      const { uri, content } = action as FSSandboxItemLoaded;

      if (state.queuedDndInfo) {
        const { item, point, editorUri } = state.queuedDndInfo;
        return handleLoadedDroppedItem(
          item,
          point,
          editorUri,
          { ...state, queuedDndInfo: null },
          content
        );
      }

      const editor = getEditorWindowWithFileUri(uri, state);

      state = refreshModuleInspectorNodes(state);

      return state;
    }
    case OPEN_FILE_ITEM_CLICKED: {
      const { uri, sourceEvent } = action as OpenFilesItemClick;
      if (getEditorWithActiveFileUri(uri, state)) {
        return state;
      }
      state = setNextOpenFile(
        removeTemporaryOpenFiles(openFile(uri, false, false, state))
      );
      return state;
    }
    case SAVED_FILE: {
      const { uri } = action as SavedFile;
      return updateOpenFile({ newContent: null }, uri, state);
    }
    case SAVED_ALL_FILES: {
      return updateRootState(
        {
          openFiles: state.openFiles.map(openFile => ({
            ...openFile,
            newContent: null
          }))
        },
        state
      );
    }
    case COMPONENT_VARIANT_NAME_CLICKED: {
      const { name } = action as ComponentVariantNameClicked;
      state = updateRootState({ selectedComponentVariantName: name }, state);
      return state;
    }

    case SOURCE_INSPECTOR_LAYER_DROPPED: {
      const { source, target, offset } = action as SourceInspectorLayerDropped;

      if (!target || source.id === target.id) {
        return state;
      }

      const sourceNode = getInspectorSourceNode(
        source,
        state.sourceNodeInspector,
        state.graph
      );

      let targetNode: PCNode;
      let targetInspectorNode: InspectorNode;

      if (target.name === InspectorTreeNodeName.CONTENT) {
        const parent = (targetInspectorNode = getParentTreeNode(
          target.id,
          state.sourceNodeInspector
        ));
        let parentSourceNode = getInspectorSourceNode(
          parent,
          state.sourceNodeInspector,
          state.graph
        ) as PCComponentInstanceElement;
        let contentNode = getInstanceSlotContent(
          target.assocSourceNodeId,
          parentSourceNode
        );
        if (!contentNode) {
          state = persistInsertNode(
            createPCPlug(target.assocSourceNodeId),
            parentSourceNode,
            TreeMoveOffset.APPEND,
            state
          );
          parentSourceNode = getInspectorSourceNode(
            parent,
            state.sourceNodeInspector,
            state.graph
          ) as PCComponentInstanceElement;
          contentNode = getInstanceSlotContent(
            target.assocSourceNodeId,
            parentSourceNode
          );
        }

        targetNode = contentNode;
      } else {
        targetInspectorNode = target;
        targetNode = getInspectorSourceNode(
          target,
          state.sourceNodeInspector,
          state.graph
        );
      }

      const oldState = state;

      state = persistRootState(
        state =>
          persistMoveSyntheticVisibleNode(
            sourceNode,
            targetNode,
            offset,
            state
          ),
        state
      );

      // this does _NOT_ work for inspector nodes like plugs & slots that
      // have no assoc synthetic node.
      // const targetSyntheticNode = getInspectorSyntheticNode(
      //   targetInspectorNode,
      //   state.documents,
      //   state.graph
      // );

      // const document = getSyntheticVisibleNodeDocument(
      //   targetSyntheticNode.id,
      //   state.documents
      // );
      // const mutatedTarget =
      //   offset === TreeMoveOffset.APPEND || offset === TreeMoveOffset.PREPEND
      //     ? targetSyntheticNode
      //     : getParentTreeNode(targetSyntheticNode.id, document);

      // state = queueSelectInsertedSyntheticVisibleNodes(
      //   oldState,
      //   state,
      //   mutatedTarget
      // );
      return state;
    }
    case SOURCE_INSPECTOR_LAYER_CLICKED: {
      const { node } = action as InspectorLayerEvent;
      state = updateSourceInspectorNode(state, sourceNodeInspector => {
        return expandInspectorNode(node, sourceNodeInspector);
      });

      const assocSyntheticNode = getInspectorSyntheticNode(
        node,
        state.documents
      );

      state = updateRootState(
        {
          selectedInspectorNodeIds: [node.id],
          selectedSyntheticNodeIds: assocSyntheticNode
            ? [assocSyntheticNode.id]
            : []
        },
        state
      );

      return state;
    }
    case SOURCE_INSPECTOR_LAYER_ARROW_CLICKED: {
      const { node } = action as InspectorLayerEvent;
      state = updateSourceInspectorNode(state, sourceNodeInspector => {
        return node.expanded
          ? collapseInspectorNode(node, sourceNodeInspector)
          : expandInspectorNode(node, sourceNodeInspector);
      });

      return state;
    }
    case SOURCE_INSPECTOR_LAYER_LABEL_CHANGED: {
      const { node, label } = action as InspectorLayerLabelChanged;

      state = persistRootState(
        browser =>
          persistChangeLabel(
            label,
            getInspectorSourceNode(
              node,
              state.sourceNodeInspector,
              browser.graph
            ),
            browser
          ),
        state
      );

      return state;
    }
    case OPEN_FILE_ITEM_CLOSE_CLICKED: {
      // TODO - flag confirm remove state
      const { uri } = action as OpenFilesItemClick;
      return closeFile(uri, state);
    }
    case EDITOR_TAB_CLICKED: {
      const { uri } = action as EditorTabClicked;
      return openFile(uri, false, false, state);
    }
    case EDITOR_TAB_CLOSE_BUTTON_CLICKED: {
      const { uri } = action as EditorTabClicked;
      return closeFile(uri, state);
    }
    case PC_DEPENDENCY_GRAPH_LOADED: {
      state = centerEditorCanvas(state, state.activeEditorFilePath);
      return state;
    }
  }
  return state;
};

export const canvasReducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case RESIZER_MOVED: {
      const { point: newPoint } = action as ResizerMoved;
      state = updateEditorWindow(
        {
          movingOrResizing: true
        },
        state.activeEditorFilePath,
        state
      );

      if (
        isSelectionMovable(
          state.selectedSyntheticNodeIds,
          state.documents,
          state.graph
        )
      ) {
        const selectionBounds = getSelectionBounds(
          state.selectedSyntheticNodeIds,
          state.documents,
          state.frames,
          state.graph
        );
        const nodeId = state.selectedSyntheticNodeIds[0];

        let movedBounds = moveBounds(selectionBounds, newPoint);

        for (const nodeId of state.selectedSyntheticNodeIds) {
          const itemBounds = getSyntheticVisibleNodeRelativeBounds(
            getSyntheticNodeById(nodeId, state.documents),
            state.frames,
            state.graph
          );
          const newBounds = roundBounds(
            scaleInnerBounds(itemBounds, selectionBounds, movedBounds)
          );

          state = updateSyntheticVisibleNodePosition(
            newBounds,
            getSyntheticNodeById(nodeId, state.documents),
            state
          );
        }
      }

      return state;
    }
    case RESIZER_MOUSE_DOWN: {
      const { sourceEvent } = action as ResizerMouseDown;
      if (sourceEvent.metaKey) {
        // state = openSyntheticVisibleNodeOriginFile(state.selectedSyntheticNodeIds[0], state);
      }
      return state;
    }

    case COMPONENT_PICKER_BACKGROUND_CLICK: {
      return setTool(null, state);
    }

    case COMPONENT_PICKER_ITEM_CLICK: {
      const { component } = action as ComponentPickerItemClick;
      return {
        ...state,
        selectedComponentId: component.id
      };
    }

    case TOOLBAR_TOOL_CLICKED: {
      const { toolType } = action as ToolbarToolClicked;
      if (toolType === ToolType.POINTER) {
        state = setTool(null, state);
      } else {
        state = setTool(toolType, state);
      }
      return state;
    }

    case ADD_VARIANT_BUTTON_CLICKED: {
      const node = getSyntheticNodeById(
        state.selectedSyntheticNodeIds[0],
        state.documents
      );
      const frame = getSyntheticVisibleNodeFrame(node, state.frames);
      const contentNode = getSyntheticNodeById(
        frame.contentNodeId,
        state.documents
      );
      state = persistRootState(
        state => persistAddVariant(contentNode, state),
        state
      );
      state = updateRootState(
        {
          selectedVariant: last(
            getPCVariants(getSyntheticSourceNode(
              contentNode,
              state.graph
            ) as PCVisibleNode)
          )
        },
        state
      );
      return state;
    }

    case REMOVE_VARIANT_BUTTON_CLICKED: {
      const variant = state.selectedVariant;
      state = persistRootState(
        state => persistRemoveVariant(variant, state),
        state
      );
      state = updateRootState({ selectedVariant: null }, state);
      return state;
    }

    case VARIANT_DEFAULT_SWITCH_CLICKED: {
      const { variant } = action as VariantDefaultSwitchClicked;
      state = persistRootState(
        state =>
          persistUpdateVariant(
            { isDefault: !variant.isDefault },
            variant,
            state
          ),
        state
      );
      return state;
    }

    case VARIANT_LABEL_CHANGED: {
      const { variant, newLabel } = action as VariantLabelChanged;
      state = persistRootState(
        state => persistUpdateVariant({ label: newLabel }, variant, state),
        state
      );
      return state;
    }

    case VARIANT_CLICKED: {
      const { variant } = action as VariantClicked;

      // must be enabled in order to see CSS changes
      const selectedVariant =
        state.selectedVariant && state.selectedVariant.id === variant.id
          ? null
          : variant;
      if (selectedVariant) {
        state = persistRootState(
          state => persistUpdateVariant({ isDefault: true }, variant, state),
          state
        );
      }
      state = updateRootState({ selectedVariant }, state);
      return state;
    }

    case COMPONENT_INSTANCE_VARIANT_TOGGLED: {
      const { variant } = action as VariantClicked;
      const element = getSyntheticNodeById(
        state.selectedSyntheticNodeIds[0],
        state.documents
      ) as SyntheticInstanceElement;
      state = persistRootState(
        state =>
          persistToggleVariantDefault(
            element,
            variant.id,
            state.selectedVariant,
            state
          ),
        state
      );
      return state;
    }

    case INSTANCE_VARIANT_RESET_CLICKED: {
      const { variant } = action as VariantClicked;
      const element = getSyntheticNodeById(
        state.selectedSyntheticNodeIds[0],
        state.documents
      ) as SyntheticInstanceElement;
      state = persistRootState(
        state =>
          persistRemoveVariantOverride(
            element,
            variant.id,
            state.selectedVariant,
            state
          ),
        state
      );
      return state;
    }

    case RESIZER_STOPPED_MOVING: {
      if (
        isSelectionMovable(
          state.selectedSyntheticNodeIds,
          state.documents,
          state.graph
        )
      ) {
        state = persistRootState(state => {
          return state.selectedSyntheticNodeIds.reduce((state, nodeId) => {
            return persistSyntheticVisibleNodeBounds(
              getSyntheticNodeById(nodeId, state.documents),
              state
            );
          }, state);
        }, state);
      }

      state = updateEditorWindow(
        {
          movingOrResizing: false
        },
        state.activeEditorFilePath,
        state
      );
      return state;
    }

    case CANVAS_WHEEL: {
      const {
        metaKey,
        ctrlKey,
        deltaX,
        deltaY,
        canvasHeight,
        canvasWidth
      } = action as CanvasWheel;
      const editorWindow = getActiveEditorWindow(state);
      const openFile = getOpenFile(
        editorWindow.activeFilePath,
        state.openFiles
      );

      let translate = openFile.canvas.translate;

      if (metaKey || ctrlKey) {
        translate = centerTransformZoom(
          translate,
          boundsFromRect({
            width: canvasWidth,
            height: canvasHeight
          }),
          clamp(
            translate.zoom + (translate.zoom * deltaY) / ZOOM_SENSITIVITY,
            MIN_ZOOM,
            MAX_ZOOM
          ),
          editorWindow.mousePosition
        );
      } else {
        translate = {
          ...translate,
          left: translate.left - deltaX,
          top: translate.top - deltaY
        };
      }

      state = updateEditorWindow(
        { smooth: false },
        editorWindow.activeFilePath,
        state
      );

      state = updateOpenFileCanvas(
        {
          translate
        },
        editorWindow.activeFilePath,
        state
      );

      return state;
    }

    case CANVAS_DROPPED_ITEM: {
      let { item, point, editorUri } = action as CanvasDroppedItem;

      if (isFile(item)) {
        return queueOpenFile(item.uri, {
          ...(state as any),
          queuedDndInfo: action
        });
      } else {
        return handleLoadedDroppedItem(item, point, editorUri, state);
      }
    }

    case SHORTCUT_ZOOM_IN_KEY_DOWN: {
      const editor = getActiveEditorWindow(state);
      const openFile = getOpenFile(editor.activeFilePath, state.openFiles);
      state = setCanvasZoom(
        normalizeZoom(openFile.canvas.translate.zoom) * 2,
        false,
        editor.activeFilePath,
        state
      );
      return state;
    }

    case SHORTCUT_TOGGLE_SIDEBAR: {
      state = {
        ...state,
        showSidebar: state.showSidebar !== false ? false : true
      };

      return state;
    }

    case SHORTCUT_ZOOM_OUT_KEY_DOWN: {
      const editor = getActiveEditorWindow(state);
      const openFile = getOpenFile(editor.activeFilePath, state.openFiles);
      state = setCanvasZoom(
        normalizeZoom(openFile.canvas.translate.zoom) / 2,
        false,
        editor.activeFilePath,
        state
      );
      return state;
    }

    case SHORTCUT_SELECT_NEXT_TAB: {
      return shiftActiveEditorTab(1, state);
    }
    case SHORTCUT_SELECT_PREVIOUS_TAB: {
      return shiftActiveEditorTab(-1, state);
    }
    case SHORTCUT_CLOSE_CURRENT_TAB: {
      return closeFile(state.activeEditorFilePath, state);
    }

    case CANVAS_MOUSE_MOVED: {
      const {
        editorWindow: { activeFilePath },
        sourceEvent: { pageX, pageY }
      } = action as CanvasMouseMoved;
      state = updateEditorWindow(
        { mousePosition: { left: pageX, top: pageY } },
        state.activeEditorFilePath,
        state
      );

      let targetNodeId: string;
      let targetInspectorNode: InspectorNode;
      state = updateRootState({ activeEditorFilePath: activeFilePath }, state);
      const editorWindow = getEditorWindowWithFileUri(activeFilePath, state);

      if (!editorWindow.movingOrResizing) {
        if (state.toolType != null) {
          targetInspectorNode = getCanvasMouseTargetInspectorNode(
            state,
            action as CanvasToolOverlayMouseMoved,
            getInsertFilter(state)
          );
          state = setHoveringInspectorNodeIds(
            state,
            targetInspectorNode ? [targetInspectorNode.id] : EMPTY_ARRAY
          );
        } else {
          targetNodeId = getCanvasMouseTargetNodeId(
            state,
            action as CanvasToolOverlayMouseMoved
          );
          state = setHoveringSyntheticVisibleNodeIds(
            state,
            targetNodeId ? [targetNodeId] : EMPTY_ARRAY
          );
        }
      }

      return state;
    }

    case CANVAS_DRAGGED_OVER: {
      const { item, offset } = action as CanvasDraggingOver;

      state = updateEditorWindow(
        { mousePosition: offset },
        state.activeEditorFilePath,
        state
      );

      // remove selection so that hovering state is visible
      state = setSelectedSyntheticVisibleNodeIds(state);

      // TODO - in the future, we'll probably want to be able to highlight hovered nodes as the user is moving an element around to indicate where
      // they can drop the element.

      let targetNodeId: string;

      targetNodeId = getCanvasMouseTargetNodeIdFromPoint(
        state,
        offset,
        getDragFilter(item, state)
      );

      state = setHoveringSyntheticVisibleNodeIds(
        state,
        targetNodeId ? [targetNodeId] : EMPTY_ARRAY
      );

      return state;
    }

    case CANVAS_MOUSE_CLICKED: {
      if (state.toolType != null) {
        return state;
      }

      state = deselectRootProjectFiles(state);

      const { sourceEvent } = action as CanvasToolOverlayClicked;
      if (/textarea|input/i.test((sourceEvent.target as Element).nodeName)) {
        return state;
      }

      // alt key opens up a new link
      const altKey = sourceEvent.altKey;

      const editorWindow = getActiveEditorWindow(state);
      const openFile = getOpenFile(
        editorWindow.activeFilePath,
        state.openFiles
      );

      // do not allow selection while window is panning (scrolling)
      if (openFile.canvas.panning || editorWindow.movingOrResizing)
        return state;

      const targetNodeId = getCanvasMouseTargetNodeId(
        state,
        action as CanvasToolOverlayMouseMoved
      );

      if (!targetNodeId) {
        return setSelectedSyntheticVisibleNodeIds(state);
      }

      if (!altKey) {
        state = handleArtboardSelectionFromAction(
          state,
          targetNodeId,
          action as CanvasToolOverlayMouseMoved
        );
        state = updateEditorWindow(
          {
            secondarySelection: false
          },
          editorWindow.activeFilePath,
          state
        );

        return state;
      }
      return state;
    }
    case CANVAS_MOUSE_DOUBLE_CLICKED: {
      const targetNodeId = getCanvasMouseTargetNodeId(
        state,
        action as CanvasToolOverlayMouseMoved
      );

      if (!targetNodeId) {
        return state;
      }

      state = openSyntheticVisibleNodeOriginFile(
        getSyntheticNodeById(targetNodeId, state.documents),
        state
      );
      return state;
    }

    case RESIZER_PATH_MOUSE_MOVED: {
      state = updateEditorWindow(
        {
          movingOrResizing: true
        },
        state.activeEditorFilePath,
        state
      );

      // TODO - possibly use BoundsStruct instead of Bounds since there are cases where bounds prop doesn't exist
      const newBounds = getResizeActionBounds(action as ResizerPathMoved);
      for (const nodeId of getBoundedSelection(
        state.selectedSyntheticNodeIds,
        state.documents,
        state.frames,
        state.graph
      )) {
        state = updateSyntheticVisibleNodeBounds(
          getNewSyntheticVisibleNodeBounds(
            newBounds,
            getSyntheticNodeById(nodeId, state.documents),
            state
          ),
          getSyntheticNodeById(nodeId, state.documents),
          state
        );
      }

      return state;
    }
    case RESIZER_PATH_MOUSE_STOPPED_MOVING: {
      state = updateEditorWindow(
        {
          movingOrResizing: false
        },
        state.activeEditorFilePath,
        state
      );

      // TODO - possibly use BoundsStruct instead of Bounds since there are cases where bounds prop doesn't exist
      const newBounds = getResizeActionBounds(
        action as ResizerPathStoppedMoving
      );

      state = persistRootState(state => {
        return state.selectedSyntheticNodeIds.reduce(
          (state, nodeId) =>
            persistSyntheticVisibleNodeBounds(
              getSyntheticNodeById(nodeId, state.documents),
              state
            ),
          state
        );
      }, state);

      return state;
    }
    case RAW_CSS_TEXT_CHANGED: {
      const { value: cssText } = action as RawCSSTextChanged;
      state = persistRootState(browser => {
        return state.selectedSyntheticNodeIds.reduce(
          (state, nodeId) =>
            persistRawCSSText(
              cssText,
              getSyntheticNodeById(nodeId, state.documents),
              state.selectedVariant,
              state
            ),
          state
        );
      }, state);
      return state;
    }

    case FRAME_MODE_CHANGE_COMPLETE: {
      const { frame, mode } = action as FrameModeChangeComplete;
      state = persistRootState(state => {
        return persistSyntheticNodeMetadata(
          { mode },
          getSyntheticNodeById(frame.contentNodeId, state.documents),
          state
        );
      }, state);
      return state;
    }
    case CSS_PROPERTY_CHANGED: {
      const { name, value } = action as CSSPropertyChanged;
      return state.selectedSyntheticNodeIds.reduce(
        (state, nodeId) =>
          persistCSSProperty(
            name,
            value,
            getSyntheticNodeById(nodeId, state.documents),
            state.selectedVariant,
            state
          ),
        state
      );
    }

    case CSS_PROPERTY_CHANGE_COMPLETED: {
      const { name, value } = action as CSSPropertyChanged;
      state = persistRootState(browser => {
        return state.selectedSyntheticNodeIds.reduce(
          (state, nodeId) =>
            persistCSSProperty(
              name,
              value,
              getSyntheticNodeById(nodeId, state.documents),
              state.selectedVariant,
              state
            ),
          state
        );
      }, state);
      return state;
    }

    case ATTRIBUTE_CHANGED: {
      const { name, value } = action as CSSPropertyChanged;
      state = persistRootState(() => {
        return state.selectedSyntheticNodeIds.reduce(
          (state, nodeId) =>
            persistAttribute(
              name,
              value,
              getSyntheticNodeById(nodeId, state.documents) as SyntheticElement,
              state
            ),
          state
        );
      }, state);
      return state;
    }

    case INHERIT_PANE_REMOVE_BUTTON_CLICK: {
      const { selectedSyntheticNodeIds } = state;
      const { componentId } = action as InheritPaneRemoveButtonClick;
      const node = getSyntheticNodeById(
        selectedSyntheticNodeIds[0],
        state.documents
      );
      state = persistRootState(state => {
        return persistInheritStyle(
          { [componentId]: undefined },
          node,
          state.selectedVariant,
          state
        );
      }, state);
      return state;
    }

    case INHERIT_PANE_ADD_BUTTON_CLICK: {
      const { selectedSyntheticNodeIds } = state;
      const node = getSyntheticNodeById(
        selectedSyntheticNodeIds[0],
        state.documents
      );
      const sourceNode = getSyntheticSourceNode(
        node,
        state.graph
      ) as PCVisibleNode;

      state = persistRootState(state => {
        // undefined so that nothing is selected in dropdown.
        state = persistInheritStyle(
          {
            [Date.now()]: {
              priority: Object.keys(sourceNode.inheritStyle || EMPTY_OBJECT)
                .length
            }
          },
          node,
          state.selectedVariant,
          state
        );
        return state;
      }, state);

      return state;
    }

    case INHERIT_ITEM_COMPONENT_TYPE_CHANGE_COMPLETE: {
      const {
        oldComponentId,
        newComponentId
      } = action as InheritItemComponentTypeChangeComplete;
      const { selectedSyntheticNodeIds } = state;
      const node = getSyntheticNodeById(
        selectedSyntheticNodeIds[0],
        state.documents
      );
      state = persistRootState(state => {
        state = persistInheritStyleComponentId(
          oldComponentId,
          newComponentId,
          node,
          state.selectedVariant,
          state
        );
        return state;
      }, state);
      return state;
    }

    case PC_RUNTIME_EVALUATED: {
      const queuedScopeSelect = state.queuedScopeSelect;

      if (queuedScopeSelect) {
        state = selectInsertedSyntheticVisibleNodes(
          queuedScopeSelect.previousState,
          state,
          queuedScopeSelect.scope
        );
      }

      state = pruneStaleSyntheticNodes(state);

      return updateRootState({ queuedScopeSelect: null }, state);
    }

    case TEXT_VALUE_CHANGED: {
      const { value } = action as TextValueChanged;
      state = persistRootState(state => {
        return persistChangeSyntheticTextNodeValue(
          value,
          getSyntheticInspectorNode(
            getSyntheticNodeById(
              state.selectedSyntheticNodeIds[0],
              state.documents
            ),
            getSyntheticVisibleNodeDocument(
              state.selectedSyntheticNodeIds[0],
              state.documents
            ),
            state.sourceNodeInspector,
            state.graph
          ),
          state
        );
      }, state);
      return state;
    }
    case ELEMENT_TYPE_CHANGED: {
      const { value } = action as ElementTypeChanged;
      state = persistRootState(state => {
        return persistChangeElementType(
          value,
          getSyntheticNodeById(
            state.selectedSyntheticNodeIds[0],
            state.documents
          ) as SyntheticElement,
          state
        );
      }, state);
      return state;
    }
    case CANVAS_TOOL_ARTBOARD_TITLE_CLICKED: {
      const { frame, sourceEvent } = action as CanvasToolArtboardTitleClicked;
      sourceEvent.stopPropagation();
      const contentNode = getFrameSyntheticNode(frame, state.documents);
      state = updateEditorWindow(
        { smooth: false },
        getPCNodeDependency(
          getSyntheticSourceNode(contentNode, state.graph).id,
          state.graph
        ).uri,
        state
      );
      return handleArtboardSelectionFromAction(
        state,
        frame.contentNodeId,
        action as CanvasToolArtboardTitleClicked
      );
    }
    case CANVAS_TOOL_WINDOW_BACKGROUND_CLICKED: {
      return setSelectedSyntheticVisibleNodeIds(state);
    }
    case COMPONENT_CONTROLLER_PICKED: {
      const { filePath } = action as ComponentControllerPicked;
      const node = getSyntheticNodeById(
        state.selectedSyntheticNodeIds[0],
        state.documents
      );
      state = persistRootState(
        state => persistAddComponentController(filePath, node, state),
        state
      );
      return state;
    }
    case REMOVE_COMPONENT_CONTROLLER_BUTTON_CLICKED: {
      const { relativePath } = action as RemoveComponentControllerButtonClicked;
      const node = getSyntheticNodeById(
        state.selectedSyntheticNodeIds[0],
        state.documents
      );
      state = persistRemoveComponentController(relativePath, node, state);
      return state;
    }
    case INSERT_TOOL_FINISHED: {
      let { point, fileUri } = action as InsertToolFinished;
      const toolType = state.toolType;

      switch (toolType) {
        case ToolType.COMPONENT: {
          const componentId = state.selectedComponentId;
          state = { ...state, selectedComponentId: null };
          const component = getPCNode(componentId, state.graph);

          return persistInsertNodeFromPoint(
            createPCComponentInstance(
              componentId,
              null,
              null,
              null,
              component.metadata
            ),
            fileUri,
            point,
            state
          );
        }
        case ToolType.ELEMENT: {
          return persistInsertNodeFromPoint(
            createPCElement(
              "div",
              { "box-sizing": "border-box", display: "block" },
              null,
              null,
              "Element"
            ),
            fileUri,
            point,
            state
          );
        }

        case ToolType.TEXT: {
          return persistInsertNodeFromPoint(
            createPCTextNode("Click to edit", "Text"),
            fileUri,
            point,
            state
          );
        }
      }
    }
  }

  return state;
};

const isJavaScriptFile = (file: string) => /(ts|js)x?$/.test(file);

const INSERT_ARTBOARD_WIDTH = 100;
const INSERT_ARTBOARD_HEIGHT = 100;

const persistInsertNodeFromPoint = (
  node: PCVisibleNode,
  fileUri: string,
  point: Point,
  state: RootState
) => {
  const oldState = state;
  const targetNodeId = getCanvasMouseTargetNodeIdFromPoint(
    state,
    point,
    getInsertFilter(state)
  );

  let targetNode: SyntheticVisibleNode | SyntheticDocument =
    targetNodeId && getSyntheticNodeById(targetNodeId, state.documents);

  let insertableSourceNode =
    targetNodeId &&
    getInsertableSourceNodeFromSyntheticNode(
      targetNode,
      getSyntheticVisibleNodeDocument(targetNodeId, state.documents),
      state.graph
    );

  if (!targetNode) {
    const newPoint = shiftPoint(
      normalizePoint(
        getOpenFile(fileUri, state.openFiles).canvas.translate,
        point
      ),
      {
        left: -(INSERT_ARTBOARD_WIDTH / 2),
        top: -(INSERT_ARTBOARD_HEIGHT / 2)
      }
    );

    let bounds = {
      left: 0,
      top: 0,
      right: INSERT_ARTBOARD_WIDTH,
      bottom: INSERT_ARTBOARD_HEIGHT,
      ...(node.metadata[PCVisibleNodeMetadataKey.BOUNDS] || {})
    };

    bounds = moveBounds(bounds, newPoint);

    node = updatePCNodeMetadata(
      {
        [PCVisibleNodeMetadataKey.BOUNDS]: bounds
      },
      node
    );

    insertableSourceNode = state.graph[fileUri].content;

    targetNode = getSyntheticDocumentByDependencyUri(
      fileUri,
      state.documents,
      state.graph
    );
  }

  state = persistRootState(state => {
    if (insertableSourceNode.name === PCSourceTagNames.SLOT) {
      state = maybeCreateContent(targetNode, insertableSourceNode, state);
      insertableSourceNode = getInstanceSlotContent(
        insertableSourceNode.id,
        getSyntheticRootInstanceSourceNode(targetNode, state)
      );
    }

    return persistInsertNode(
      node,
      insertableSourceNode,
      TreeMoveOffset.APPEND,
      state
    );
  }, state);

  state = setTool(null, state);

  const scope = getInsertableSourceNodeScope(
    insertableSourceNode,
    targetNode as SyntheticVisibleNode,
    getSyntheticVisibleNodeDocument(targetNode.id, state.documents),
    state.graph
  );

  state = queueSelectInsertedSyntheticVisibleNodes(oldState, state, scope);

  return state;
};

const maybeCreateContent = <TState extends RootState>(
  target: SyntheticNode,
  slot: PCSlot,
  state: TState
) => {
  const instanceSourceNode = getSyntheticRootInstanceSourceNode(target, state);
  const contentNode = getInstanceSlotContent(slot.id, instanceSourceNode);
  if (contentNode) {
    return state;
  }

  state = persistInsertNode(
    createPCPlug(slot.id),
    instanceSourceNode,
    TreeMoveOffset.APPEND,
    state
  );

  return state;
};

const getSyntheticRootInstanceSourceNode = (
  target: SyntheticNode,
  state: RootState
) => {
  const document = getSyntheticVisibleNodeDocument(target.id, state.documents);
  const instanceId = getSyntheticInstancePath(target, document, state.graph)[0];
  const instanceSourceNode = getPCNode(
    instanceId,
    state.graph
  ) as PCComponentInstanceElement;
  return instanceSourceNode;
};

const getDragFilter = (item: any, state: RootState) => {
  // TODO - filter should check if is slot
  let filter = getInsertFilter(state);

  if (isFile(item) && isJavaScriptFile(item.uri)) {
    filter = (node: SyntheticVisibleNode) => {
      const sourceNode = getSyntheticSourceNode(node, state.graph);
      return (
        isSyntheticContentNode(node, state.graph) &&
        sourceNode.name === PCSourceTagNames.COMPONENT
      );
    };
  } else if (isInspectorNode(item)) {
    const sourceNode = getPCNode(item.assocSourceNodeId, state.graph);
    if (sourceNode.name === PCSourceTagNames.COMPONENT) {
      return () => false;
    }
  }

  return filter;
};
const getInsertFilter = (state: RootState) => {
  let filter = (node: SyntheticVisibleNode) => {
    const document = getSyntheticVisibleNodeDocument(node.id, state.documents);
    return Boolean(
      getInsertableSourceNodeFromSyntheticNode(node, document, state.graph)
    );
  };

  return filter;
};

const setFileExpanded = (node: FSItem, value: boolean, state: RootState) => {
  state = updateRootState(
    {
      projectDirectory: updateNestedNode(
        node,
        state.projectDirectory,
        (node: FSItem) => ({
          ...node,
          expanded: value
        })
      )
    },
    state
  );
  return state;
};

const getNewSyntheticVisibleNodeBounds = (
  newBounds: Bounds,
  node: SyntheticVisibleNode,
  state: RootState
) => {
  const currentBounds = getSelectionBounds(
    state.selectedSyntheticNodeIds,
    state.documents,
    state.frames,
    state.graph
  );
  const innerBounds = getSyntheticVisibleNodeRelativeBounds(
    node,
    state.frames,
    state.graph
  );
  return scaleInnerBounds(innerBounds, currentBounds, newBounds);
};

const handleLoadedDroppedItem = (
  item,
  point: Point,
  editorUri: string,
  state: RootState,
  content?: Buffer
) => {
  const targetNodeId = getCanvasMouseTargetNodeIdFromPoint(
    state,
    point,
    getDragFilter(item, state)
  );

  let sourceNode: PCVisibleNode;

  if (isFile(item)) {
    let src = path.relative(path.dirname(editorUri), item.uri);

    if (src.charAt(0) !== ".") {
      src = "./" + src;
    }

    if (isImageUri(item.uri)) {
      sourceNode = createPCElement(
        "img",
        {},
        {
          src
        }
      );
      if (isSvgUri(item.uri)) {
        const source = content.toString("utf8");
        sourceNode = xmlToPCNode(source);
      }
    } else if (isJavaScriptFile(item.uri)) {
      return persistRootState(state => {
        return persistAddComponentController(
          (item as FSItem).uri,
          getSyntheticNodeById(targetNodeId, state.documents),
          state
        );
      }, state);
    }
  } else if (isInspectorNode(item)) {
    sourceNode = getSyntheticSourceNode(
      getInspectorSyntheticNode(item, state.documents),
      state.graph
    ) as PCVisibleNode;
  } else {
    sourceNode = cloneTreeNode((item as RegisteredComponent).template);
  }

  if (!sourceNode) {
    console.error(`Unrecognized dropped item.`);
    return state;
  }

  const targetId = getCanvasMouseTargetNodeIdFromPoint(
    state,
    point,
    node => node.name !== PCSourceTagNames.TEXT
  );
  let target: SyntheticVisibleNode | SyntheticDocument = targetId
    ? getSyntheticNodeById(targetId, state.documents)
    : getSyntheticDocumentByDependencyUri(
        editorUri,
        state.documents,
        state.graph
      );

  if (target.name === SYNTHETIC_DOCUMENT_NODE_NAME) {
    sourceNode = updatePCNodeMetadata(
      {
        [PCVisibleNodeMetadataKey.BOUNDS]: moveBounds(
          sourceNode.metadata[PCVisibleNodeMetadataKey.BOUNDS] ||
            DEFAULT_FRAME_BOUNDS,
          point
        )
      },
      sourceNode
    );
  }

  return persistRootState(
    browser =>
      persistInsertNode(
        sourceNode,
        getSyntheticSourceNode(target, state.graph),
        TreeMoveOffset.APPEND,
        browser
      ),
    state
  );
};

const getResizeActionBounds = (action: ResizerPathMoved | ResizerMoved) => {
  let {
    anchor,
    originalBounds,
    newBounds,
    sourceEvent
  } = action as ResizerPathMoved;

  const keepAspectRatio = sourceEvent.shiftKey;
  const keepCenter = sourceEvent.altKey;

  if (keepCenter) {
    // TODO - need to test. this might not work
    newBounds = keepBoundsCenter(newBounds, originalBounds, anchor);
  }

  if (keepAspectRatio) {
    newBounds = keepBoundsAspectRatio(
      newBounds,
      originalBounds,
      anchor,
      keepCenter ? { left: 0.5, top: 0.5 } : anchor
    );
  }

  return newBounds;
};

const isInputSelected = (state: RootState) => {
  // ick -- this needs to be moved into a saga
  return (
    document.activeElement &&
    /textarea|input|button/i.test(document.activeElement.tagName)
  );
};

const shortcutReducer = (state: RootState, action: Action): RootState => {
  switch (action.type) {
    case SHORTCUT_QUICK_SEARCH_KEY_DOWN: {
      return isInputSelected(state)
        ? state
        : updateRootState(
            {
              showQuickSearch: !state.showQuickSearch
            },
            state
          );
    }
    case SHORTCUT_UNDO_KEY_DOWN: {
      return undo(state);
    }
    case SHORTCUT_REDO_KEY_DOWN: {
      return redo(state);
    }
    case SHORTCUT_T_KEY_DOWN: {
      return isInputSelected(state) ? state : setTool(ToolType.TEXT, state);
    }
    case SHORTCUT_R_KEY_DOWN: {
      return isInputSelected(state) ? state : setTool(ToolType.ELEMENT, state);
    }
    case SHORTCUT_C_KEY_DOWN: {
      return isInputSelected(state)
        ? state
        : setTool(ToolType.COMPONENT, state);
    }
    case SHORTCUT_CONVERT_TO_COMPONENT_KEY_DOWN: {
      // TODO - should be able to conver all selected nodes to components
      if (state.selectedSyntheticNodeIds.length > 1) {
        return state;
      }

      const oldState = state;

      state = persistRootState(
        state =>
          persistConvertNodeToComponent(
            getSyntheticNodeById(
              state.selectedSyntheticNodeIds[0],
              state.documents
            ),
            state
          ),
        state
      );

      state = setSelectedSyntheticVisibleNodeIds(state);

      state = queueSelectInsertedSyntheticVisibleNodes(
        oldState,
        state,
        getSyntheticDocumentByDependencyUri(
          state.activeEditorFilePath,
          state.documents,
          state.graph
        )
      );
      return state;
    }
    case SHORTCUT_WRAP_IN_SLOT_KEY_DOWN: {
      const selectedNode = getSyntheticNodeById(
        state.selectedSyntheticNodeIds[0],
        state.documents
      );
      const sourceNode = getSyntheticSourceNode(selectedNode, state.graph);
      const sourceModule = getPCNodeModule(sourceNode.id, state.graph);
      const contentNode = getPCNodeContentNode(sourceNode.id, sourceModule);

      if (
        syntheticNodeIsInShadow(
          selectedNode,
          getSyntheticVisibleNodeDocument(selectedNode.id, state.documents),
          state.graph
        )
      ) {
        return confirm(
          "Cannot perform this action for shadow elements.",
          ConfirmType.ERROR,
          state
        );
      }

      if (contentNode.name !== PCSourceTagNames.COMPONENT) {
        return confirm(
          "Slots are only supported for elements that are within a component.",
          ConfirmType.ERROR,
          state
        );
      }

      if (sourceNode.id === contentNode.id) {
        return confirm(
          "Cannot convert components into slots.",
          ConfirmType.ERROR,
          state
        );
      }

      state = persistRootState(state => {
        return persistWrapInSlot(selectedNode, state);
      }, state);
      return state;
    }
    case SHORTCUT_ESCAPE_KEY_DOWN: {
      if (isInputSelected(state)) {
        return state;
      }
      if (state.toolType != null) {
        return setTool(null, state);
      } else {
        state = setSelectedSyntheticVisibleNodeIds(state);
        state = setSelectedFileNodeIds(state);
        state = updateRootState({ insertFileInfo: null }, state);
        return state;
      }
    }
    case SHORTCUT_DELETE_KEY_DOWN: {
      const now = Date.now();
      if (
        isInputSelected(state) ||
        state.selectedInspectorNodeIds.length === 0
      ) {
        return state;
      }

      const firstNode = getNestedTreeNodeById(
        state.selectedInspectorNodeIds[0],
        state.sourceNodeInspector
      );

      const sourceNode = getInspectorSourceNode(
        firstNode,
        state.sourceNodeInspector,
        state.graph
      );

      if (!canRemovePCNode(sourceNode, state)) {
        return confirm(
          "Please remove all instances of component before deleting it.",
          ConfirmType.ERROR,
          state
        );
      }

      let parent = getParentTreeNode(firstNode.id, state.sourceNodeInspector);
      const index = parent.children.indexOf(firstNode);

      state = persistRootState(state => {
        return state.selectedInspectorNodeIds.reduce((state, nodeId) => {
          const inspectorNode = getNestedTreeNodeById(
            nodeId,
            state.sourceNodeInspector
          );
          if (inspectorNodeInShadow(inspectorNode, state.sourceNodeInspector)) {
            const sourceNode = getInspectorSourceNode(
              inspectorNode,
              state.sourceNodeInspector,
              state.graph
            );

            // content, or slot. Ignore
            if (!isVisibleNode(sourceNode)) {
              return state;
            }
            const syntheticNode = getInspectorSyntheticNode(
              inspectorNode,
              state.documents
            );
            return persistSyntheticVisibleNodeStyle(
              { display: "none" },
              syntheticNode,
              null,
              state
            );
          }
          const assocSyntheticNode = getInspectorSyntheticNode(
            inspectorNode,
            state.documents
          );

          if (assocSyntheticNode) {
            state = removeSyntheticVisibleNode(assocSyntheticNode, state);
          }

          return persistRemovePCNode(sourceNode, state);
        }, state);
      }, state);

      parent = getNestedTreeNodeById(
        parent.id,
        state.sourceNodeInspector
      ) as InspectorNode;

      const nextChildren = parent.children.filter(
        child => child.assocSourceNodeId !== sourceNode.id
      );

      const nextSelectedNodeId = nextChildren.length
        ? nextChildren[Math.min(index, nextChildren.length - 1)].id
        : parent.name !== SYNTHETIC_DOCUMENT_NODE_NAME
          ? parent.id
          : null;

      if (nextSelectedNodeId) {
        const nextInspectorNode = getNestedTreeNodeById(
          nextSelectedNodeId,
          state.sourceNodeInspector
        );
        const assocSyntheticNode = getInspectorSyntheticNode(
          nextInspectorNode,
          state.documents
        );
        if (assocSyntheticNode) {
          state = setSelectedSyntheticVisibleNodeIds(
            state,
            assocSyntheticNode.id
          );
        } else {
          // does not exist as rep
          state = updateRootState(
            { selectedInspectorNodeIds: [nextInspectorNode.id] },
            state
          );
        }
      }
    }
  }

  return state;
};

const clipboardReducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case SYNTHETIC_NODES_PASTED: {
      const { clips } = action as SyntheticVisibleNodesPasted;
      const oldState = state;

      let offset: TreeMoveOffset = TreeMoveOffset.BEFORE;
      let targetNode: SyntheticVisibleNode | SyntheticDocument;
      let scopeNode: SyntheticVisibleNode | SyntheticDocument;

      if (state.selectedSyntheticNodeIds.length) {
        const nodeId = state.selectedSyntheticNodeIds[0];
        scopeNode = targetNode = getSyntheticNodeById(nodeId, state.documents);
        scopeNode = getParentTreeNode(
          scopeNode.id,
          getSyntheticVisibleNodeDocument(scopeNode.id, state.documents)
        );
      } else {
        offset = TreeMoveOffset.PREPEND;
        scopeNode = targetNode = getSyntheticDocumentByDependencyUri(
          state.activeEditorFilePath,
          state.documents,
          state.graph
        );
      }

      state = persistRootState(
        state => persistAppendPCClips(clips, targetNode, offset, state),
        state
      );

      state = queueSelectInsertedSyntheticVisibleNodes(
        oldState,
        state,
        scopeNode
      );

      return state;
    }
  }

  return state;
};

const handleArtboardSelectionFromAction = <
  T extends { sourceEvent: React.MouseEvent<any> }
>(
  state: RootState,
  nodeId: string,
  event: T
) => {
  const { sourceEvent } = event;
  state = setRootStateSyntheticVisibleNodeExpanded(nodeId, true, state);
  state = setSelectedSyntheticVisibleNodeIds(state, nodeId);
  return state;
};

const setCanvasZoom = (
  zoom: number,
  smooth: boolean = true,
  uri: string,
  state: RootState
) => {
  const editorWindow = getEditorWindowWithFileUri(uri, state);
  const openFile = getOpenFile(uri, state.openFiles);
  return updateOpenFileCanvas(
    {
      translate: centerTransformZoom(
        openFile.canvas.translate,
        editorWindow.container.getBoundingClientRect(),
        clamp(zoom, MIN_ZOOM, MAX_ZOOM),
        editorWindow.mousePosition
      )
    },
    uri,
    state
  );
};

const normalizeBounds = (translate: Translate, bounds: Bounds) => {
  return zoomBounds(
    shiftBounds(bounds, {
      left: -translate.left,
      top: -translate.top
    }),
    1 / translate.zoom
  );
};

const normalizePoint = (translate: Translate, point: Point) => {
  return zoomPoint(
    shiftPoint(point, {
      left: -translate.left,
      top: -translate.top
    }),
    1 / translate.zoom
  );
};

const normalizeZoom = zoom => {
  return zoom < 1 ? 1 / Math.round(1 / zoom) : Math.round(zoom);
};
