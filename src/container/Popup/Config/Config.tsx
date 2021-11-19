import { useDispatch } from "react-redux";
import styled from "styled-components";
import { SetConfig } from "../../../state/Config";
import { useRootState } from "../../../state/root";

const Config = () => {
  const config = useRootState((state) => state.config);

  const dispatch = useDispatch();

  return (
    <Container>
      <ConfigItem
        type="number"
        name="スーパーチャットの自動読み込み間隔(分)"
        defaultValue={config.superChatAutoReloadMinutes}
        onChange={(value) => {
          dispatch(SetConfig({ key: "superChatAutoReloadMinutes", value }));
        }}
      />
      <ConfigItem
        type="radio"
        name="スーパーチャットの並びルール"
        items={["日付", "額"]}
        defaultValue={config.superChatSortType === "date" ? 0 : 1}
        onChange={(value) => {
          dispatch(
            SetConfig({
              key: "superChatSortType",
              value: value === 0 ? "date" : "amount",
            })
          );
        }}
      />
    </Container>
  );
};

export default Config;

type ConfigItemProps<T, Type extends "number" | "boolean" | "radio"> = {
  name: string;
  type: Type;
  items?: string[];
  defaultValue?: T;
  onChange?: (value: T) => void;
};

const ConfigItem = <T, Type extends "number" | "boolean" | "radio">({
  name,
  type,
  items,
  defaultValue,
  onChange,
}: ConfigItemProps<T, Type>) => (
  <ItemContainer className="config-item">
    <div className="name">{name}</div>
    <div className="value">
      {(() => {
        switch (type) {
          case "boolean":
            return (
              <input
                type="checkbox"
                defaultChecked={!!defaultValue}
                onChange={(e) => {
                  const { checked } = e.target;
                  onChange?.(checked as unknown as T);
                }}
              />
            );

          case "number":
            return (
              <input
                type="number"
                defaultValue={defaultValue as unknown as number}
                onChange={(e) => {
                  const { value } = e.target;
                  onChange?.(parseInt(value) as unknown as T);
                }}
              />
            );

          case "radio": {
            if (items == null) {
              throw new Error("type 'radio' must be 'items'");
            }

            return (
              <label className="config-item-radio">
                {items.map((item, index) => (
                  <>
                    {item}
                    <input
                      name={name}
                      key={`${item}-${index}`}
                      type="radio"
                      value={index}
                      defaultChecked={
                        index === (defaultValue as unknown as number)
                      }
                      onChange={() => {
                        onChange?.(index as unknown as T);
                      }}
                    />
                  </>
                ))}
              </label>
            );
          }

          default:
            return null;
        }
      })()}
    </div>
  </ItemContainer>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  > .config-item {
    width: 90%;
    display: flex;
    margin: 10px 5px;
  }
  > .config-item:nth-child(1) {
    margin-top: 40px;
  }
`;

const ItemContainer = styled.label`
  .name {
    color: #fff;
  }

  .value {
    color: #fff;
    margin-left: auto;
  }
`;
