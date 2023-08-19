import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useState } from "react";

type Props = {
  name?: string;
  phone?: string;
  address?: string;
};

export default NiceModal.create((props: Props) => {
  console.log(props);
  const modal = useModal();

  const {
    name: propsName = "",
    phone: propsPhone = "",
    address: propsAddress = "",
  } = props;

  const [name, setName] = useState(propsName);
  // const [nameValid, setNameValid] = useState('valid' || 'invalid');
  const [phone, setPhone] = useState(propsPhone);
  const [address, setAddress] = useState(propsAddress);

  const onCreate = () => {
    if (!name) {
      // setNameValid('invalid');
      alert("姓名不能为空");
      return;
    }
    modal.resolve({ name, phone, address });
    modal.hide();
    modal.remove();
  };

  const onUpdate = () => {
    modal.resolve({ name, phone, address });
    modal.hide();
    modal.remove();
  };

  return (
    <Modal
      isOpen={modal.visible}
      onClose={() => modal.hide()}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {name ? "编辑" : "新增"}客户信息
            </ModalHeader>
            <ModalBody>
              <Input
                isRequired
                label="姓名"
                variant="bordered"
                value={name}
                onValueChange={setName}
                // validationState={nameValid}
                // errorMessage="姓名不能为空"
              />
              <Input
                label="手机号"
                variant="bordered"
                value={phone}
                onValueChange={setPhone}
              />
              <Input
                label="地址"
                variant="bordered"
                value={address}
                onValueChange={setAddress}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                取消
              </Button>
              <Button color="primary" onPress={name ? onUpdate : onCreate}>
                {name ? "更新" : "创建"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
});
