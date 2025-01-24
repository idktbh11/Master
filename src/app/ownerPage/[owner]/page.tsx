import OwnerComponent from "@/components/OwnerPageComponent/OwnerComponent";
interface OwnerProps {
    params : {
        owner : string,
    }
}
const Owner : React.FC<OwnerProps> = ({ params }) => {
    const owner = params.owner;
    return(
        <OwnerComponent owner={owner}/>
    )
}

export default Owner;