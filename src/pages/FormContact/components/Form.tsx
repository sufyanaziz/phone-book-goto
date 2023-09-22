import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Text from "@common/components/Text";
import { css } from "@emotion/react";
import { AddSquareIcon, MinusSquareIcon } from "assets/icon";
import Button from "@common/components/Button";
import useFormContact from "../hooks/useFormContact";

const formContactStyle = () => {
  return css({
    width: "100%",
    ".field-input": {
      display: "flex",
      gap: "4px",
      width: "100%",
      ".input-container": {
        width: "100%",
        marginRight: "12px",
        ":last-child": {
          marginRight: 0,
        },
        ".input": {
          width: "100%",
          marginTop: "4px",
        },
      },
    },
    ".field-phone-numbers": {
      marginTop: "12px",
      ".phone-container": {
        display: "flex",
        marginBottom: "8px",
        width: "100%",
        "&:last-child": {
          marginBottom: "0px",
        },
        ".icons": {
          display: "flex",
          marginLeft: "8px",
          ".add-icon, .minus-icon": {
            display: "flex",
            alignItems: "center",
          },
        },
      },
    },
  });
};

const Form = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([""]);

  const { addNewContact, result } = useFormContact();

  const isDisabled = useMemo(() => {
    if (result.loading) return true;
    if (!firstName) return true;
    if (!lastName) return true;
    if (phoneNumbers.some((phone) => !phone)) return true;
    return false;
  }, [firstName, lastName, phoneNumbers, result.loading]);

  const resetState = () => {
    setFirstName("");
    setLastName("");
    setPhoneNumbers([""]);
  };

  useEffect(() => {
    if (!result.loading && result.isSuccess) {
      navigate("/");
      resetState();
    }
  }, [result.isSuccess, result.loading]);

  return (
    <div css={formContactStyle}>
      <div className="field-input">
        <div className="input-container">
          <Text text="First Name" />
          <input
            className="input"
            placeholder="Input First Name..."
            value={firstName}
            onChange={(e) => {
              const value = e.target.value.replace(/\s\s/g, " ");
              if (/^(?![\s])[\w\s]*$/.test(value)) {
                setFirstName(value);
              }
            }}
          />
        </div>
        <div className="input-container">
          <Text text="Last Name" />
          <input
            className="input"
            placeholder="Input Last Name..."
            value={lastName}
            onChange={(e) => {
              const value = e.target.value.replace(/\s\s/g, " ");
              if (/^(?![\s])[\w\s]*$/.test(value)) {
                setLastName(value);
              }
            }}
          />
        </div>
      </div>
      <div className="field-phone-numbers">
        <Text text="Phone Numbers" css={{ marginBottom: "4px" }} />
        {phoneNumbers.map((phone, listIdx) => {
          return (
            <div className="phone-container" key={`phone-${listIdx}`}>
              <input
                className="input"
                placeholder={`Phone ${listIdx + 1}`}
                value={phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[\d]*$/.test(value)) {
                    const phones = [...phoneNumbers];
                    phones[listIdx] = value;
                    setPhoneNumbers(phones);
                  }
                }}
              />
              <div className="icons">
                {phoneNumbers.length > 1 ? (
                  <div
                    className="minus-icon"
                    onClick={() => {
                      setPhoneNumbers(
                        phoneNumbers.filter((_, idx) => idx !== listIdx)
                      );
                    }}
                  >
                    <MinusSquareIcon />
                  </div>
                ) : null}
                <div
                  className="add-icon"
                  onClick={() => setPhoneNumbers((prev) => [...prev, ""])}
                >
                  <AddSquareIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div css={{ marginTop: "16px", width: "100%" }}>
        <Button
          label="Add Contact"
          disabled={isDisabled}
          onClick={() => {
            addNewContact({
              variables: {
                first_name: firstName,
                last_name: lastName,
                phones: phoneNumbers.map((phone) => ({ number: phone })),
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default Form;