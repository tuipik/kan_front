export default function HandleTrashClick (doFunction, confirm_msg, success_msg, showSuccess, showErrors) {
  if (!window.confirm(confirm_msg)) return;
  doFunction
    .unwrap()
    .then(result => showSuccess({body: success_msg}))
    .catch(error => showErrors(error.data))
}