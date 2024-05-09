//promise это объект, у которого нет свойств, есть только методы.
//promise может находиться в одном из трёх состояний:
    //1) pending - ожидание
    //2) resolved - обещание выполнено, promise выполнился
    //3) rejected - обещание не выполнено


//Promise (с большой буквы):
// Promise — это глобальный объект, который представляет
// собой конструктор для создания новых промисов. Он предоставляет
// несколько статических методов для работы с промисами в более обобщенном виде.

//promise (с маленькой буквы):
// Это экземпляр объекта Promise. Каждый такой объект представляет собой
// асинхронную операцию, которая может завершиться успехом или ошибкой.
// Экземпляры промисов имеют методы, которые позволяют обрабатывать завершение этих операций.



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

const promise2 = findUserInDataBase(1)
//.........
//.............
//resolved or rejected
//.........
promise2.then(
    //если promise перейдёт в состояние resolved то эта функция выполнится
    (user) => {console.log(user)}
)
//......
//.........
//rejected
promise2.catch(
    //если promise перейдёт в состояние rejected то эта функция выполнится
    (error) => {console.log(error)}
)

//3) finally - метод, который выполняется когда promise или за-resolve-лся или за-reject-ился
promise2.finally(

    () => {console.log('finish')}
)

//методы Promise: -------------------------------------------------//

//all и allSettled

const otherPromise = Promise.all([promise1, promise2])
//метод .all вернёт другой промис (otherPromise)
//массив результатов которыми за-resolve-лись эти два промиса (results) приходит ↓↓↓

otherPromise.then((results) => {
    //когда otherPromise за-resolve-тся, он выполнит эту функцию,
    //а за-resolve-тся он тогда, когда промисы переданные в статический
    //метод .all за-resolve-ятся

    let dataFromGoogle = results[0]
    let userFromDataBase = results[1]
    console.log('finish resolved promise' + dataFromGoogle + userFromDataBase)
})

otherPromise.catch(() => {
    //если хоть один из промисов не resolve-тся, то не resolve-ятся все промисы
    console.log('failed, try later')
})


//метод allSettled возвращает другой промис, который за-resolve-тся тогда, когда
//promise1 и promise2 уйдут из состояние pending(ожидание), т.е. если один
// из промисов не resolve-тся, то доступ к за-resolve-ленному можно будет получить
const otherPromise2 = Promise.allSettled([promise1, promise2])

otherPromise2.then((results) => {

    let dataFromGoogle =
        results[0].status === 'fulfilled' ? results[0] : {data: null}

    let userFromDataBase =
        results[1].status === 'fulfilled' ? results[1] : {data: results[1].reason}

})

