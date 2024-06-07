import { useParams } from "react-router-dom";
import { useDevice } from "../../context/Device";
import { back_modal } from "../Modals/back.modal";
import { get_userWait, set_userWait } from "./Scene";
import { skip_modal } from "../Modals/skip.modal";

export function SkipButton({ cb }) {
  const lang = useParams().lang;
  const device = useDevice();

  return (
    <>
      <button
        onClick={() => {
          const original_value = get_userWait();
          set_userWait(true);
          skip_modal(lang, {
            onCancel: () => {
              set_userWait(original_value);
            },
            onConfirm: () => {
              cb();
            },
          });
        }}
        className={`skip-btn-${device}`}
      >
        SKIP
      </button>
    </>
  );
}

export function HomeButton() {
  const lang = useParams().lang;
  const device = useDevice();
  return (
    <>
      <button
        onClick={() => {
          const original_value = get_userWait();
          set_userWait(true);
          back_modal(lang, {
            onCancel: () => {
              set_userWait(original_value);
            },
          });
        }}
        className={`home-btn-${device}`}
      >
        HOME
      </button>
    </>
  );
}
