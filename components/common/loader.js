import {useState} from 'react'
import PuffLoader from 'react-spinners/PuffLoader'

const Loading = (props) => {
	let [loading, setLoading] = useState(props.loading || true);
	let [color, setColor] = useState(props.color || "#f3d2a9");
    
    return (
        <div className='d-flex justify-content-center'>
            <PuffLoader color={color} loading={loading} size={props.size || 100} />
        </div>
    );
};

export default Loading
