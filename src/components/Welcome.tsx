import welcomeSVG from '../../public/images/undraw_hello_ccwj.svg'

export function Welcome() {
    return (
        <div className="flex bg-white p-8 px-10 rounded-lg gap-4 items-center justify-around">
            <img src={welcomeSVG} alt="a" className='w-100' />
            <div className="flex flex-col">
                <h1 className='text-3xl font-semibold'>Olá, <span className='font-black'>Nome do Usuario</span>!</h1>
                <p className='text-lg w-100'>Voce tem <span className='text-green-500'>4</span> tarefas para finalizar hoje. Voce já completou <span className='text-green-500'>30%</span> das tarefas de hoje. Seu progresso está <span className='text-green-500'>Muito bom!</span></p>
            </div>
        </div>
    )
}