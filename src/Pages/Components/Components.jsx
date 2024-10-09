import Counter from '../../components/Counter/Counter'
import Timer from '../../components/Timer/Timer'
import Add from '../../components/Add/Add';
import Temperatures from '../../components/Temperatures/Temperatures'

import './Components.css'

function Components() {
    return ( 
        <div className="component-container">
            <h1>
                <span className='badge bg-dark'>REACT COMPONENTS</span>
            </h1>

            <div>
                <div className='component-container-1'>
                    <div className='component-container-2'>
                        <Counter/>
                        <Timer value={0}/>
                    </div>
                    

                    <div className='component-container-3'>
                        <Add/>
                    </div>

                </div>

                
                <div>
                    <Temperatures/>
                </div>

                <h4>
                    <span className='badge bg-dark'>นางสาว เกศราภรณ์ ใยบัว รหัส 67183473</span>
                </h4>
            </div>
        </div>
     );
}

export default Components;