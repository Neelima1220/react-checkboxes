import * as React from 'react';
import './style.css';

const Rdata: any = [
  {
    id: 1,
    label: 'js',
    isItemChecked: false,
    statuses: [
      { id: 1, label: 'js-1', isItemChecked: false },
      { id: 2, label: 'js-2', isItemChecked: false },
      { id: 3, label: 'js-3', isItemChecked: false },
    ],
  },
  {
    id: 2,
    label: 'html',
    isItemChecked: false,
    statuses: [
      { id: 1, label: 'html-1', isItemChecked: false },
      { id: 2, label: 'html-2', isItemChecked: false },
      { id: 3, label: 'html-3', isItemChecked: false },
    ],
  },
  {
    id: 3,
    label: 'css',
    isItemChecked: false,
    statuses: [
      { id: 1, label: 'css-1', isItemChecked: false },
      { id: 2, label: 'css-2', isItemChecked: false },
      { id: 3, label: 'css-3', isItemChecked: false },
    ],
  },
];

export default function App() {
  const [data, setData] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [isAllChecked, setIsAllChecked] = React.useState(false);

  React.useEffect(() => {
    setData(Rdata);
  }, []);

  React.useEffect(() => {
    setIsAllChecked(data && data.every((item) => item.isItemChecked === true));
  }, [data]);

  React.useEffect(() => {
    const newDa =
      data &&
      data.filter((item) => item.isItemChecked).map((item) => item.label);
    setSelected(newDa);
  }, [data]);

  const handleAllClick = (i, e) => {
    const tempData = [...data];
    const newData = tempData.map((item, index) => {
      const newI = item.statuses.map((status) => ({
        ...status,
        isItemChecked: !status.isItemChecked,
      }));
      return {
        ...item,
        isItemChecked: !item.isItemChecked,
        statuses: [...newI],
      };
    });
    setData(newData);
  };

  const handleChange = (i) => {
    const tempData = [...data];
    const n = tempData.map((item, index) => {
      if (index === i) {
        const newI = item.statuses.map((status) => ({
          ...status,
          isItemChecked: !status.isItemChecked,
        }));
        return {
          ...item,
          isItemChecked: !item.isItemChecked,
          statuses: [...newI],
        };
      } else {
        return { ...item };
      }
    });
    setData(n);
  };

  const handleSubItemChange = (i) => {
    console.log(i, 'idx');
    const tempData = [...data];
    const n = tempData.map((item, index) => {
      const newI = item.statuses.map((status, idx) => {
        if (idx === i) {
          return {
            ...status,
            isItemChecked: !status.isItemChecked,
          };
        } else {
          return {
            ...status,
          };
        }
      });
      return { ...item, statuses: [...newI] };
    });
    setData(n);
  };

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <input
        type="checkbox"
        value="Al"
        onClick={handleAllClick}
        checked={isAllChecked}
      />
      <label>All</label>
      {data?.length &&
        data.map((item, index: number) => {
          return (
            <div>
              <input
                type="checkbox"
                value={`${item.label}`}
                checked={item.isItemChecked}
                onChange={() => handleChange(index)}
              />
              <label>{item.label}</label>
              <div>
                {item?.statuses &&
                  item.statuses.map((status, idx: number) => {
                    return (
                      <div style={{ marginLeft: '1.5rem' }}>
                        <input
                          type="checkbox"
                          value={`${status.label}`}
                          checked={status.isItemChecked}
                          onChange={() => handleSubItemChange(idx)}
                        />
                        <label>{status.label}</label>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      <div>
        selected Values:{' '}
        {selected &&
          selected.map((item, index) =>
            index === selected.length - 1 ? (
              <span>{item}</span>
            ) : (
              <span>{item},</span>
            )
          )}
      </div>
      <div>
        <table>
          <tr>
            <th>id</th>
            <th>label</th>
            <th>checked</th>
          </tr>
          {data?.length &&
            data.map((item, index) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.label}</td>
                  <td>{item.isItemChecked.toString()}</td>
                </tr>
              );
            })}
        </table>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: 'fit-content',
        }}
      >
        {data?.length &&
          data.map((item, index) => {
            return (
              <div
                style={{
                  padding: '3rem',
                  width: '50px',
                  border: '1px solid black',
                  backgroundColor: item.isItemChecked ? 'red' : 'green',
                }}
              >
                {item.label}
              </div>
            );
          })}
      </div>
    </div>
  );
}
