import { useDraggable } from "@dnd-kit/core";
import { Button } from "antd";
import { twMerge } from "tailwind-merge";
import { FormElement } from "./FormElements";
import { formatStatusEnum } from "@/utils/formatEnum";

interface Props {
  formElement: FormElement;
}

const SidebarBtnElement = ({ formElement }: Props) => {
  const { label, icon: Icon } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
      className={twMerge(
        `flex flex-col gap-2 h-[120px] w-[120px] cursor-grab`,
        draggable.isDragging && "ring-2 ring-primary"
      )}
      variant="outlined"
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="w-8 h-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export const SidebarBtnElementDragOverlay = ({ formElement }: Props) => {
  const { label, icon: Icon } = formElement.designerBtnElement;
  return (
    <Button
      className={`flex flex-col gap-2 h-[120px] w-[120px] cursor-grab`}
      variant="outlined"
    >
      <Icon className="w-8 h-8 text-primary cursor-grab" />
      <p className="text-xs">{formatStatusEnum(label)}</p>
    </Button>
  );
};

export default SidebarBtnElement;
