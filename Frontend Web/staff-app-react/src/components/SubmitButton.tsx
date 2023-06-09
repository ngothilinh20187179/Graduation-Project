
import { Button, FormInstance } from "antd";
import { useWatch } from "antd/es/form/Form";
import { useEffect, useState } from "react";

export const SubmitButton = ({ 
    form, 
    text,
    isSubmitting 
  }: { 
    form: FormInstance,
    text: string,
    isSubmitting: boolean 
  }) => {
    const [submittable, setSubmittable] = useState(false);
    const values = useWatch([], form);
  
    useEffect(() => {
      form.validateFields({ validateOnly: true }).then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        },
      );
    }, [form, values]);
  
    return (
      <Button type="primary" htmlType="submit" disabled={!submittable || isSubmitting}>
        {text}
      </Button>
    );
  };