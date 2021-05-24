const SERVER_HOST = "http://localhost:3003";

export function getSendQuestionUri(userId: string) {
    return `${SERVER_HOST}/patient/${userId}/question`;
}

export function getQuestionsUri(userId: string) {
    return `${SERVER_HOST}/patient/${userId}/questions`;
}

export function getSendCarePlanUri(userId: string) {
    return `${SERVER_HOST}/medical_provider/${userId}/care_plan`;
}

export function getCarePlansUri(userId: string, patientId: string) {
    return `${SERVER_HOST}/medical_provider/${userId}/${patientId}/care_plans`;
}

export const sendGetRequest = async(uri:string) => {
    const response = await fetch(uri, {
        method: 'GET',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
    });
    const responseJson = await response.json();
    return responseJson;
}

export const sendPostRequest = async(uri:string, body:object) => {
    const response = await fetch(uri, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const responseJson = await response.json();
    return responseJson;
}