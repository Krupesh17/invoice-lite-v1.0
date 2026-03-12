import { useTheme } from "@/contexts/theme-provider";

function ErrorPage() {
  const { theme } = useTheme();

  return (
    <div className="w-full h-dvh bg-background text-foreground flex items-center">
      <div className="mx-auto px-4 flex items-center">
        <div className="shrink-0 border-r pr-4 mr-5">
          <img
            src={
              theme === "light"
                ? "/assets/error_404_icon_light.svg"
                : "/assets/error_404_icon_dark.svg"
            }
            className="size-14"
          />
        </div>
        <div className="">
          <h1 className="text-2xl font-semibold">404</h1>
          <p className="text-sm text-muted-foreground">
            OOPS! PAGE NOT TO BE FOUND
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
