import registrationHeaderUrl from "../../../../packages/ens-components/src/assets/register-ens-header.svg?url";
import registrationSuccessUrl from "../../../../packages/ens-components/src/assets/register-ens-success.svg?url";

const graphicClassName = "mx-auto w-full max-w-64";

export function RegistrationHeaderGraphic() {
  return <img alt="" className={graphicClassName} src={registrationHeaderUrl} />;
}

export function RegistrationSuccessGraphic() {
  return <img alt="" className={graphicClassName} src={registrationSuccessUrl} />;
}
