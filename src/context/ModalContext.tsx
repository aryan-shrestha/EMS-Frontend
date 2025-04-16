import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ModalState {
  isOpen: boolean;
  title: string;
  description?: string;
  content?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

const initialState: ModalState = {
  isOpen: false,
  title: "",
  description: "",
  content: null,
};

type ModalAction =
  | { type: "OPEN"; payload: Omit<ModalState, "isOpen"> }
  | { type: "CLOSE" };

const modalReducer = (state: ModalState, action: ModalAction): ModalState => {
  switch (action.type) {
    case "OPEN":
      return { ...state, ...action.payload, isOpen: true };
    case "CLOSE":
      return initialState;
    default:
      return state;
  }
};

interface ModalContextType {
  openModal: (options: Omit<ModalState, "isOpen">) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(modalReducer, initialState);

  const openModal = useCallback((options: Omit<ModalState, "isOpen">) => {
    dispatch({ type: "OPEN", payload: options });
  }, []);

  const closeModal = useCallback(() => {
    dispatch({ type: "CLOSE" });
  }, []);

  const contextValue = useMemo(
    () => ({ openModal, closeModal }),
    [openModal, closeModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Dialog open={state.isOpen} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{state.title}</DialogTitle>
            {state.description && (
              <DialogDescription>{state.description}</DialogDescription>
            )}
          </DialogHeader>
          <div className="mt-6">{state.content}</div>
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
