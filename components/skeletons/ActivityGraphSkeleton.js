import ActivityGraph from "@/components/ActivityGraph";
import {Spin} from "antd";

const ActivityGraphSkeleton = () => {
    return (
            <Spin>
                <ActivityGraph />
            </Spin>
    )
}

export default ActivityGraphSkeleton;

