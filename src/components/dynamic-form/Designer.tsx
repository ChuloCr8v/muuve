import useDesigner from "@/hooks/useDesigner";
import { idGenerator } from "@/utils/id-generator";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Button } from "antd";
import { useState } from "react";
import { BiSolidTrash } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import FormConfigSideBar from "./FormConfigSideBar";
import { SmModules } from "@/api/types";
import { AppForms } from "@/types";

interface Props {
  module: SmModules;
  setFormName: React.Dispatch<React.SetStateAction<AppForms>>;
}

const Designer = ({ setFormName, module }: Props) => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea =
        over.data.current?.isDesignerDropArea;

      const droppingSidebarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea;

      // First Scenario
      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf =
        over.data.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const droppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      // Second Scenario
      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data.current?.type;
        const newElement = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        const overId = over.data.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("element not found");
        }

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, newElement);
        return;
      }

      // Third Scenario
      const isDraggingDesignerElement = active.data.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data.current?.elementId;
        const overId = over.data.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full ">
      <div
        className="w-full p-4"
        onClick={() => {
          if (selectedElement) {
            setSelectedElement(null);
          }
        }}
      >
        {/*  */}
        <div
          ref={droppable.setNodeRef}
          className={twMerge(
            " max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto bg-white",
            droppable.isOver && "ring-2 ring-black"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="flex items-center flex-grow text-3xl font-bold text-muted-foreground">
              Drop Here
            </p>
          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="w-full p-4">
              <div className="h-[120px] rounded-md bg-gray-300"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((e) => (
                <DesignerElementWrapper key={e.id} element={e} />
              ))}
            </div>
          )}
        </div>
        {/*  */}
      </div>
      <FormConfigSideBar setFormName={setFormName} module={module} />
    </div>
  );
};

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement, setSelectedElement } = useDesigner();

  const [mouseIsOver, setMouseIsOver] = useState(false);

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.id,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative border  rounded-xl h-[120px] flex flex-col text-foreground hover:cursor-pointer ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className={`absolute w-full  h-1/2 rounded-t-md`}
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 w-full h-1/2 rounded-b-md"
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button
              variant="outlined"
              className="flex justify-center h-full bg-red-500 border rounded-l-none rounded-r-xl"
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}
            >
              <BiSolidTrash className="w-6 h-6" />
            </Button>
          </div>
          <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-pulse">
            <p className="text-sm text-muted-foreground">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-t-xl h-[7px] bg-black" />
      )}
      <div
        className={twMerge(
          "flex w-full h-[120px] items-center rounded-xl bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
          mouseIsOver && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-b-xl h-[7px] bg-black" />
      )}
    </div>
  );
}

export default Designer;
