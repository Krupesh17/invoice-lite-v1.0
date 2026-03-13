import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function TooltipWrapper({ children, content }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default TooltipWrapper;
