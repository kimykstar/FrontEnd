import "./mainMemoirTitle.scss";
import type { SubTitleItem } from "../common/memoir.types";
import EditSubTitle from "./editSubMemoirTitle";
import { useMainTitleItemStore } from "../common/useMainTitleItemStore";
import EditableMemoirTitle from "./editableMemoriTitle.tsx";

const MainMamoirTitle = (props: { id: number; editable: boolean }) => {
    const { id, editable } = props;
    const mainTitleItem = useMainTitleItemStore((state) => state.mainTitleItems[id]);
    const {
        deleteMainTitleItem,
        updateMainTitleMode,
        updateMainTitle,
        deleteSubTitleItem,
        updateSubTitleMode,
        updateSubTitle,
    } = useMainTitleItemStore();
    const { subMemoirTitles } = mainTitleItem;

    return (
        <div className={"memoir-title-container"}>
            {id > 0 && <hr />}
            <EditableMemoirTitle
                editable={editable}
                title={mainTitleItem.title}
                mode={mainTitleItem.mode}
                deleteTitleItem={() => {
                    deleteMainTitleItem(id);
                }}
                updateTitleMode={() => updateMainTitleMode(id)}
                updateTitle={(newTitle: string) => updateMainTitle(id, newTitle)}
            />
            <div className={"sub-title-container"}>
                {subMemoirTitles.map((subMemoirTitle: SubTitleItem, subMemoirId: number) => {
                    return (
                        <EditableMemoirTitle
                            editable={editable}
                            title={subMemoirTitle.title}
                            mode={subMemoirTitle.mode}
                            deleteTitleItem={() => {
                                deleteSubTitleItem(id, subMemoirId);
                            }}
                            updateTitleMode={() => updateSubTitleMode(id, subMemoirId)}
                            updateTitle={(newTitle: string) => updateSubTitle(id, subMemoirId, newTitle)}
                        />
                    );
                })}
                {editable && <EditSubTitle mainTitleId={id} />}
            </div>
        </div>
    );
};

export default MainMamoirTitle;
