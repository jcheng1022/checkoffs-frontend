import CreateCollection from "@/components/groups/CreateCollection";
import {COLLECTION_TYPES} from "@/constants";

export default function CreateGroupPage() {

    return (
        <CreateCollection type={COLLECTION_TYPES.GROUP}/>
    );
}


