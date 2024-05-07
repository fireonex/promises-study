//promise это объект, у которого нет свойств, есть только методы.
//promise может находиться в одном из трёх состояний:
    //1) pending - ожидание
    //2) resolved - обещание выполнено, promise выполнился
    //3) rejected - обещание не выполнено


//----------------------------------------------------------------------------------//
//методы promise:

//1) then - метод, с помощью которого можно подписаться на момент, когда promise за-resolve-тся
//2) catch - метод, с помощью которого можно подписаться на момент, когда promise за-rejected-ся

//pending
promise1.then((data) => {
    //выполнить эту функцию когда promise выполнится (за-resolve-тся)
    console.log(data)
})

//pending
const findUserInDataBase = (id) => {}

const promice2 = findUserInDataBase(1)
//.........
//.............
//resolved or rejected
//.........
promice2.then(
    //если promise перейдёт в состояние resolved то эта функция выполнится
    (user) => {console.log(user)}
)
//......
//.........
//rejected
promice2.catch(
    //если promise перейдёт в состояние rejected то эта функция выполнится
    (error) => {console.log(error)}
)

//3) finally - метод, который выполняется когда promise или за-resolve-лся или за-reject-ился
promice2.finally(

    () => {console.log('finish')}
)