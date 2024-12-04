/* Captive Portal Service!, try put '/generate_204' after the deployed url */
export function onRequest(context) {
    return new Response(null, {"status": 204});
}