const { gogole } = require('googleapis')

const { oAuth2 } = gogole.oAuth2

const oAuth2Client = new oAuth2('1016404714711-f42d1lf1jcrh7qr9p9svc5a4sdnmfcjt.apps.googleusercontent.com', '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')

oAuth2Client.setCredentials({refresh_token: '1//04am7DUuxg9TWCgYIARAAGAQSNwF-L9Ir1Pdob58T8QWJsI_Ed7QsWqCHAGfh4L0UIial8v6bLj5kpsfga3fjSfwj9UP9k5bwnEg'})

const calendar = google.calendar({version: 'v3', auth: oAuth2Client})

const eventStartTime = new Date()
eventStartTime.setDate(eventStartTime.getDay() + 2)

const eventEndTime = new Date()
eventEndTime.setDate(eventEndTime.getDay() + 2)
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

const event = {
    summary: 'Test Meeting',
    location: '115 Montague St, Brooklyn, NY 11201'
}