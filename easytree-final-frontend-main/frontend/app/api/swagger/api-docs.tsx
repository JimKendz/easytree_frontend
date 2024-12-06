// frontend/pages/api-docs.tsx
import React from 'react';
import SwaggerUI from 'swagger-ui-react';
//import 'swagger-ui-react/swagger-ui.css';

const SwaggerDocs = () => {
  return (
    <div>
      <SwaggerUI url="/api/swagger/api-docs.tsx" />
    </div>
  );
};

export default SwaggerDocs;
