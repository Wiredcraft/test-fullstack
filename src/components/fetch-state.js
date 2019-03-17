import React from "react";
import LoadingBar from "./loading-bar";
import Modal from "./modal";

const NotFound = "NotFound";
const Network = "Network";
const Auth = "Auth";
const Service = "Service";

const isJsonResponse = res => {
  const type = res.headers.get("content-type");
  return type ? type.split(";")[0] === "application/json" : false;
};

export const onGetSucceeded = res => {
  if (res.ok) return res.json();
  if (res.status === 401) throw [Auth];
  throw [Service];
};

export const onTryGetSucceeded = res => {
  if (res.ok) return res.json();
  if (res.status === 404) throw [NotFound];
  throw [Service];
};

export const onPatchSucceeded = res => {
  if (res.ok) {
    if (res.status === 204) return true;
    return res.json();
  }

  if (isJsonResponse(res)) {
    return res.json().then(error => {
      throw [error.name, error.data];
    });
  }

  return res.text().then(payload => {
    throw [Service, payload];
  });
};

export const onFetchFailed = () => {
  throw [Network];
};

const NotFoundCopy = "Nothing is here";
const NetworkCopy = "Please check your network connection.";
const ServiceCopy =
  "We are having an issue when processing your request, " +
  "please try again later.";

export const ErrorMessage = ({ error: [name] }) => {
  switch (name) {
    case NotFound:
      return NotFoundCopy;

    case Network:
      return NetworkCopy;

    case Service:
    default:
      return ServiceCopy;
  }
};

export default ({ immediate, loading, error, onDismissError, children }) => {
  let message;

  if (error) {
    const [name, data] = error;

    if (name === Network) {
      message = NetworkCopy;
    } else if (name === Service) {
      message = ServiceCopy;
    } else if (children) {
      message = children(name, data);
    }

    if (!message) message = name;
  }

  return (
    <React.Fragment>
      <LoadingBar immediate={immediate} loading={loading} />
      {error && <Modal onClose={onDismissError}>{message}</Modal>}
    </React.Fragment>
  );
};
