import React, { Suspense } from "react";
import Container from "@common/components/Container";
import HeaderTitle from "@common/components/HeaderTitle";

const Form = React.lazy(() => import("./components/Form"));

const FormContact = () => {
  return (
    <Container
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        css={{
          width: "85vw",
          border: "1px solid black",
          padding: "16px",
          "@media (min-width: 720px)": {
            width: "50vw",
          },
        }}
      >
        <HeaderTitle
          title="Form Contact"
          css={{ display: "flex", justifyContent: "center" }}
        />
        <Suspense fallback={<p>Loading...</p>}>
          <Form />
        </Suspense>
      </div>
    </Container>
  );
};

export default FormContact;
