import { FC, useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, message } from "antd";
import { doc, setDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import TextArea from "antd/lib/input/TextArea";
import { v4 as uuidv4 } from "uuid";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialValues?: any | null;
}

const AddCourseModal: FC<Props> = ({
  open,
  onClose,
  onSuccess,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const isEditMode = Boolean(initialValues?.id);

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, open, form]);

  const handleFinish = async (values: any) => {
    setSubmitting(true);
    try {
      if (isEditMode) {
        const courseRef = doc(db, "courses", initialValues.id);
        await updateDoc(courseRef, {
          ...values,
          updatedAt: serverTimestamp(),
        });
        message.success("Course updated successfully!");
      } else {
        const courseId = uuidv4();
        const courseRef = doc(db, "courses", courseId);

        await setDoc(courseRef, {
          ...values,
          createdAt: serverTimestamp(),
        });

        // Default first lesson
        await setDoc(doc(courseRef, "lessons", "intro"), {
          title: "Welcome & Introduction",
          videoUrl: values.videoUrl || "",
          isPreview: true,
          position: 1,
        });

        message.success("Course and default lesson added successfully!");
      }

      form.resetFields();
      onClose();
      onSuccess();
    } catch (err) {
      console.error("Error saving course:", err);
      message.error("Failed to save course.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={submitting}
      title={isEditMode ? "Edit Course" : "Add New Course"}
      okText={isEditMode ? "Save Changes" : "Add Course"}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Course Title"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter course title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={3} placeholder="Short course description" />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber
            min={0}
            className="w-full"
            formatter={(val) => `$ ${val}`}
          />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Select placeholder="Choose a category">
            <Select.Option value="english">English</Select.Option>
            <Select.Option value="math">Math</Select.Option>
            <Select.Option value="science">Science</Select.Option>
            <Select.Option value="georgian">Georgian</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="thumbnailUrl" label="Thumbnail URL">
          <Input placeholder="Optional image URL" />
        </Form.Item>
        <Form.Item name="videoUrl" label="Intro Video (YouTube)">
          <Input placeholder="Optional YouTube link" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCourseModal;
