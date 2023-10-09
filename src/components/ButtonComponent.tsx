import {FC} from "react";

type Props = {
    label: string;
    icon: string;
};

export const ButtonComponent: FC<Props> = ({label, icon}) => {
    return (
        <button
            style={{
                background: "none",
                border: "none",
                paddingInline: "10px",
                height: "35px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
            }}
        >
            <img
                alt={"icon"}
                src={icon}
                style={{width: "20px", marginRight: "5px"}}
            />
            <span style={{fontSize: "13px"}}>{label}</span>
        </button>
    );
};
