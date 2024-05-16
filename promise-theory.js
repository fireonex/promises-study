//promise это объект, у которого нет свойств, есть только методы.
//promise может находиться в одном из трёх состояний:
    //1) pending - ожидание
    //2) resolved - обещание выполнено, promise выполнился (fulfilled)
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

//all и allSettled---------------------//


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




//resolve и reject-------------------//

//метод resolve создал сразу за-resolve-ленный числом 100 промис
//метод resolve используется как заглушка, если backend ещё не сделан

const resolvedPromise = Promise.resolve(100)

//метод reject - аналог resolve, создает сразу за-reject-нутый промис

const rejectedPromise = Promise.reject('some error')

//к ним также можно применять then и catch
resolvedPromise
    .then((data) => {console.log(data)})
    .catch((error) => {console.log(error)})


//пример использования
const usersAPI = {
    getAllUsers() {
        return Promise.resolve([{name: 'D'}, {name: 'N'}]);
    }
};

const promiseUs = usersAPI.getAllUsers();
promiseUs.then(users => console.log(users));


//--------цепочка промисов--------------------------------------------------------//
//каждый вызов then возвращает новый промис

const promise3 = findUserInDataBase(3)
//промис promise3_2 за-resolve-тся/за-reject-едся тогда, когда за-resolve-тс/за-reject-едся promise3
//т.е когда выполнится коллбэк и метод then у promise3
promise3_2 = promise3.then((user) => {return user.name})
//promise3 вернёт имя юзера (user.name), и этим именем юзера за-resolve-тся promise3_2

promise3_2.then((name) => {console.log(name)})

//пример как это пишется в реальной жизни:
findUserInDB(3) //найди юзера в базе данных с id = 3
    .then((user) => { return user.name; }) //когда он найдётся, возьми его имя
    .then((name) => console.log(name));//и выведи это имя в консоль



//то что возращает коллбэк внутри then переходит
// как результат в другой коллбэк внутри следующего по цепочке then
findUserInDB(1)
    .then(user => user.name)
    .then(name => {
        console.log(name);
        return 100;
    })
    .then(number => {
        console.log(number);
        return {value: number + 1};
    })
    .then(obj => {
        console.log(obj.value);
        return obj.value + 2;
    });



//если из одного коллбэка возвращаем (return) промис,
// то в следующий коллбэк придёт не промис целиком, а то, чем он за-resolve-лся
const promiseChain = findUserInDB(1)
    .then(user => user.name)
    .then(name => {
        console.log(name);
        return 100;
    })
    .then(number => {
        console.log(number);
        const newProm = Promise.resolve(number + 1)
        return newProm;
    })
    .then(num => {
        console.log(num);
        return num + 2;
    }); //промис вернувшийся от последнего then запишется
        // в promiseChain (его за-resolve-ленный результат (number))



//then-ы выполняются моментально, а запрос на сервер findUserInDB занимает пару секунд
const promiseChain = findUserInDB(1)//задержка пару секунд
    .then(user => user.name)
    .then(name => {
        console.log(name);
        return 100;//моментально
    })
    .then(number => {
        console.log(number);
        const newProm = findUserInDataBase(2)//задержка пару секунд
        return newProm;
    })
    .then(user => {
        console.log(user.name);//моментально
    });




//так писать не нужно!
const lastPromise = findUserInDB(1)
    .then(user => {
        console.log(user);
        return findUserInDB(user.friend)
            .then(user => {
                console.log(user);
                return findUserInDB(user.friend)
                    .then(user => {
                        console.log(user);
                    });
            });
    });


//чистый аналог с цепочкой then
const lastPromise = findUserInDB(1)//найди пользователь по id
    .then(user => {
        console.log(user);
        return user;//затем выведи пользователя в консоль и передай дальше
    })
    .then(user => findUserInDB(user.friend))//затем возьми у этого пользователя друга
                                                    // и запроси этого друга в базе данных
    .then(friend1 => {
        console.log(friend1);
        return friend1;//затем этого пришедшего друга выведи в консоль и передай дальше
    })
    .then(friend1 => findUserInDB(friend1.friend))//затем у полученного друга запроси его друга в базе данных
    .then(friend2 => console.log(friend2.name));//и когда друг этого друга придёт то вывести его имя в консоль




//-------async/await--------------------------------------------------------------------------------------------------//
//await - ждём от промиса результата, то, чем он за-resolve-тся (аналог then)
//await можно использовать только внутри ассинхронной функции

    //аналог цепочки then:

    async function runFunc (){ //ассинхронная функция
        let userInDB = await findUserInDataBase(1) //ищем пользователя в базе данных (
        // функция остановиться в этом моменте, дождётся когда промис за-resolve-тся,
        // и то, чем он за-resolve-тся попадёт в userInDB)
        console.log(userInDB) //и затем выведем в консоль
        let friend = await findUserInDataBase(userInDB.friend1) //получаем у юзера друга (
                                                                // await-им, дожидаемся когда промис за-resolve-тся)
        console.log(friend) //выводим в консоль друга
        let friend2 = await findUserInDataBase(friend1.friend) //у друга получаем его друга (
        // await-им, дожидаемся когда промис за-resolve-тся)
        console.log(friend2.name) //и выводим в консоль имя друга друга
    }
    runFunc()


    // .then(user => { ... })
    // .then(user => findUserInDB(user.friend))
    // .then(friend1 => { ... })
    // .then(friend1 => findUserInDB(friend1.friend))
    // .then(friend2 => console.log(friend2.name))



