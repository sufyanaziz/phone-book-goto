import React from "react";
import { Theme, css } from "@emotion/react";
import Text from "@common/components/Text";
import Button from "@common/components/Button";

type TCardContactData = {
  id: number;
  first_name: string;
  last_name: string;
  phones: { number: string }[];
};

type TCardContact = {
  data: TCardContactData;
  onDelete: (data: TCardContactData) => void;
  onDetail: (data: TCardContactData) => void;
  onEdit: (data: TCardContactData) => void;
};

const CardContact: React.FC<TCardContact> = ({ data, ...rest }) => {
  const cardContentStyle = (theme: Theme) => {
    return css({
      border: `1px solid black`,
      borderBottom: 0,
      padding: `${theme.padding[4]} ${theme.padding[3]}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      ":last-child": {
        marginBottom: 0,
        borderBottom: "1px solid black",
      },
      ".card-content-action": {
        display: "flex",
        gap: "4px",
      },
    });
  };
  return (
    <div css={cardContentStyle}>
      <div className="card-content-info">
        <Text
          text={`${data.first_name} ${data?.last_name || ""}`}
          type="bold"
        />
        <Text text={data.phones?.[0]?.number} />
      </div>
      <div className="card-content-action">
        <Button
          label="Detail"
          type="default"
          onClick={() => rest.onDetail(data)}
        />
        <Button label="Edit" type="warning" onClick={() => rest.onEdit(data)} />
        <Button
          label="Delete"
          type="important"
          onClick={() => rest.onDelete(data)}
        />
      </div>
    </div>
  );
};

export default CardContact;
