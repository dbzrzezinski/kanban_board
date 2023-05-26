export type AlertProps = {
  //alertType: "success" | "error" | "warning" | "info";
  alertType: "success" | "error";
  alertTitle: string;
  alertMessage: string;
  hideTimeout?: number | boolean;
};

export type AlertTypeClasses = {
  [key: string]: {
    [key: string]: string;
  };
};
