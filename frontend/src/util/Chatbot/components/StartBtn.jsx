/* eslint-disable react/prop-types */


export default function StartBtn(props) {

    const initialAction = () => {
        props.actions.initialAction();
    }

    return (
        <div>
            <button className='start-btn' onClick={() => initialAction()}>Lets Get Started</button>
        </div >
    )
}
