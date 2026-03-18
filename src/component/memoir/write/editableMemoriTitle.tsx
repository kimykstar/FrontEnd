import { useState } from "react";
import "./editableMemoirTitle.scss";

type EditableMemoirTitleProps = {
    editable: boolean;
    title: string;
    mode: "VIEW" | "EDIT";
    deleteTitleItem: () => void;
    updateTitleMode: () => void;
    updateTitle: (newTitle: string) => void;
};

const EditableMemoirTitle = (props: EditableMemoirTitleProps) => {
    const { editable, title, mode, deleteTitleItem, updateTitleMode, updateTitle } = props;
    const [btnShow, setBtnShow] = useState(false);
    const [titleState, setTitleState] = useState<string>(title);

    const handleMoreBtn = (e: React.MouseEvent) => {
        e.stopPropagation();
        setBtnShow(!btnShow);
    };

    const handleDeleteBtn = () => {
        if (confirm("정말로 삭제하시겠습니까?")) {
            deleteTitleItem();
        }
    };

    const handleEditBtn = () => {
        updateTitleMode();
    };

    const handleOnChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleState(e.currentTarget.value);
    };

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateTitle(e.currentTarget.value);
            updateTitleMode();
        }
    };
    return (
        <div className={"title-container"}>
            <input
                className={"title-content"}
                value={titleState}
                disabled={mode === "VIEW"}
                onChange={handleOnChage}
                onKeyDown={handlePressEnter}
            />
            {editable && (
                <div className={"btn-container"}>
                    {btnShow && <img src="/images/delete.svg" className={"delete-img"} onClick={handleDeleteBtn} />}
                    {btnShow && <img src="/images/edit.svg" className={"edit-img"} onClick={handleEditBtn} />}
                    <img src="/images/more.svg" className={"more-img"} onClick={handleMoreBtn} />
                </div>
            )}
        </div>
    );
};

export default EditableMemoirTitle;
