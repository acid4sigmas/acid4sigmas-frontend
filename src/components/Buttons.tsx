import { MouseEventHandler } from "react";

export namespace Buttons {
    interface DefaultProps {
        label: string;
        onClick: React.MouseEventHandler<HTMLButtonElement>;
    }

    export const Default: React.FC<DefaultProps> = ({ label = "", onClick}) => {
        return (
        <div>
            <button
                onClick={onClick}
                className={
                    [
                        "bg-secondary",
                        "pb-1 pt-1 pr-3 pl-3",
                        "text-primary-text-color",
                        "rounded-lg",
                        "drop-shadow-lg",
                        "hover:opacity-80"
                    ].join(" ")
                }
            >
                {label}
            </button>
        </div>
        )
    }

    interface ToggleProps {
        checked: boolean;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }
    
    export const Toggle: React.FC<ToggleProps> = ({ checked = false, onChange }) => {
        return (
        <div>
            <label className="relative inline-flex items-center cursor-pointer">
                <input 
                    type="checkbox"
                    onChange={onChange}
                    checked={checked}
                    className="sr-only peer"
                    value=""
                />
                <div className={
                    [
                        // Base styles
                        "group", "peer", "bg-grey-100", "rounded-full", "duration-300", "w-14", "h-8", 

                        // Styles for the after pseudo-element
                        "after:duration-300", "after:bg-grey-200", "after:rounded-full", 
                        "after:absolute", "after:h-6", "after:w-6", "after:top-1", "after:left-1", 
                        "after:flex", "after:justify-center", "after:items-center",

                        // Conditional styles when the peer element is checked
                        "peer-checked:after:bg-primary",
                        "peer-checked:after:translate-x-6", 
                        "peer-checked:bg-secondary",
                        "peer-hover:after:scale-95"
                    ].join(" ")
                }></div>

                
            </label>

        </div>
        )
    }

}