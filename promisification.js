//findUserInDataBase(1).then(userInDB => console.log(userInDB))

// const getNumber = () => {
//     return Math.random()
// }

// const num1 = getNumber()
// const num2 = getNumber()
//
// console.log(num1)
// console.log(num2)


//промисификация - создание промиса там, где его не было (оборачивание в промис)
// чтобы взаимодействие с чем-либо было в контексте промисов
const getNumber = () => {
    //const promise = Promise.resolve(Math.random())

    const promise = new Promise((resolve, reject) => {
        reject('some error')
        setTimeout(() => {
            resolve(Math.random())
        }, 2000)

    })

    return promise
}

//getNumber().then((num1) => console.log(num1))
//getNumber().then((num2) => console.log(num2))


const repo = {

    saveSync(data) {
        const promise = new Promise((resolve, reject) => {
            try {
                localStorage.setItem('some-key', JSON.stringify(data))
            } catch (error) {
                return false
            }
            return true
        })
    },

    saveAsync(data) {
        const promise = new Promise((resolve, reject) => {
            try {
                localStorage.setItem('some-key-2', JSON.stringify(data))
                resolve()
            } catch (error) {
                reject(error)
            }
            return promise
        })

    },

    read() {
        return new Promise((res, rej) => {
            res(JSON.parse(localStorage.setItem('some-key')))
        })
    }
}

const result = repo.saveSync({name: 'Katara'})
if (result) {
    console.log('saved')
} else {
    console.warn('not saved')
}



const promise = repo.saveAsync({name: 'Katara'})
promise
    .then(() => console.log('saved'))
    .catch((error) => console.warn('not saved' + ' ' + error))

const asyncFunc = async () => {
    await repo.saveAsync({name: 'Katara'})
    console.log('saved')

    await repo.read()
    console.log()
}



