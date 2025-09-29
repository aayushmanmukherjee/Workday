import {
  Calendar,
  CheckCircle,
  FilePlus,
  Plus,
  PlusIcon,
  User,
  Users,
  X,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Footer from "../components/Footer";

const Day = () => {
  const { axios } = useAppContext();
  const [maintask1, setMaintask1] = useState("");
  const [subtask1, setSubtask1] = useState([]);
  const [tasks1, setTasks1] = useState([]);
  const [maintask2, setMaintask2] = useState("");
  const [tasks2, setTasks2] = useState([]);
  const [subtask2, setSubtask2] = useState([]);
  const [maintask3, setMaintask3] = useState("");
  const [tasks3, setTasks3] = useState([]);
  const [subtask3, setSubtask3] = useState([]);
  const [maintask4, setMaintask4] = useState("");
  const [subtask4, setSubtask4] = useState([]);
  const [tasks4, setTasks4] = useState([]);

  const navigate = useNavigate();
  const { workdayid } = useParams();

  const handleSubtask1 = () => {
    setSubtask1([...subtask1, ""]);
  };
  const removeSubtask1 = (index) => {
    const update = subtask1.filter((_, i) => i !== index);
    setSubtask1(update);
  };
  const task1 = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/task/create/${workdayid}`, {
        maintask: maintask1,
        subtasks: subtask1,
        category: "mustdo",
      });
      if (data.success) {
        setMaintask1("");
        setSubtask1([]);
        fetchTasks1();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchTasks1 = async () => {
    try {
      const { data } = await axios.get(`/api/task/show/${workdayid}`);
      if (data.success) {
        setTasks1(data.tasks);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubtask2 = () => {
    setSubtask2([...subtask2, ""]);
  };
  const removeSubtask2 = (index) => {
    const update = subtask2.filter((_, i) => i !== index);
    setSubtask2(update);
  };
  const task2 = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/task/create/${workdayid}`, {
        maintask: maintask2,
        subtasks: subtask2,
        category: "schedule",
      });
      if (data.success) {
        setMaintask2("");
        setSubtask2([]);
        fetchTasks2();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchTasks2 = async () => {
    try {
      const { data } = await axios.get(`/api/task/show/${workdayid}`);
      if (data.success) {
        setTasks2(data.tasks);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubtask3 = () => {
    setSubtask3([...subtask1, ""]);
  };
  const removeSubtask3 = (index) => {
    const update = subtask3.filter((_, i) => i !== index);
    setSubtask3(update);
  };
  const task3 = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/task/create/${workdayid}`, {
        maintask: maintask3,
        subtasks: subtask3,
        category: "ask",
      });
      if (data.success) {
        setMaintask3("");
        setSubtask3([]);
        fetchTasks3();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchTasks3 = async () => {
    try {
      const { data } = await axios.get(`/api/task/show/${workdayid}`);
      if (data.success) {
        setTasks3(data.tasks);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubtask4 = () => {
    setSubtask4([...subtask1, ""]);
  };
  const removeSubtask4 = (index) => {
    const update = subtask4.filter((_, i) => i !== index);
    setSubtask4(update);
  };
  const task4 = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/task/create/${workdayid}`, {
        maintask: maintask4,
        subtasks: subtask4,
        category: "postpone",
      });
      if (data.success) {
        setMaintask4("");
        setSubtask4([]);
        fetchTasks4();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchTasks4 = async () => {
    try {
      const { data } = await axios.get(`/api/task/show/${workdayid}`);
      if (data.success) {
        setTasks4(data.tasks);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/workday/delete/${workdayid}`);
      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTasks1();
    fetchTasks2();
    fetchTasks3();
    fetchTasks4();
  }, []);

  return (
    <div className="relative">
      <h1
        onClick={() => navigate("/")}
        className="text-5xl max-sm:text-2xl font-extrabold p-5 cursor-pointer"
      >
        workday
      </h1>
      <div className="flex p-2 max-sm:p-0 w-screen flex-wrap gap-5 justify-center items-center">
        <div className="rounded-4xl border p-2 w-[45%]">
          <h2 className="flex text-2xl max-sm:text-sm items-center font-bold gap-2 underline text-green-500">
            must do <CheckCircle size={20} className="text-green-500" />
          </h2>
          <p className="text-sm max-sm:text-[9px] text-gray-500">
            urgent and important things that must get done today
          </p>
          <form className="flex flex-col gap-2" onSubmit={task1}>
            <div className="flex gap-2 max-sm:gap-1">
              <input
                type="text"
                placeholder="create a task"
                className="rounded-4xl max-sm:rounded-3xl border border-gray-500 p-1 max-sm:text-[10px] max-sm:w-[100px]"
                value={maintask1}
                onChange={(e) => setMaintask1(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSubtask1}
                className="bg-green-500 rounded-4xl max-sm:rounded-3xl p-1 text-sm max-sm:text-[7px] flex text-white items-center cursor-pointer hover:bg-green-300 transition-all duration-200 max-sm:w-[60px]"
              >
                create a subtask <Plus size={15} />
              </button>
            </div>
            <div className="flex flex-col">
              {subtask1.map((sub, i) => (
                <div className="flex gap-1 items-center" key={i}>
                  <input
                    type="text"
                    placeholder={`subtask ${i + 1}`}
                    className="border border-gray-500 rounded-4xl w-1/2 max-sm:text-[10px]"
                    value={sub}
                    onChange={(e) => {
                      const newSubtasks = [...subtask1];
                      newSubtasks[i] = e.target.value;
                      setSubtask1(newSubtasks);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeSubtask1(i)}
                    className="cursor-pointer"
                  >
                    <X size={20} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="bg-green-500 rounded-4xl max-sm:rounded-3xl p-2 max-sm:p-1 font-bold flex text-white items-center cursor-pointer hover:bg-green-300 transition-all duration-200 w-1/4 max-sm:w-1/2 max-sm:text-[10px]"
            >
              submit task
            </button>
          </form>
          <div className="border-t mt-2 p-2 flex flex-col">
            <div className="bg-gray-200 flex flex-col gap-1 rounded-4xl max-sm:rounded-3xl p-2">
              {tasks1
                .filter((t) => t.category === "mustdo")
                .map((i) => (
                  <>
                    <h4 className="font-bold underline max-sm:text-sm">
                      {i.maintask}
                    </h4>
                    <div className="flex flex-col">
                      {i.subtasks.map((sub) => (
                        <ol className="list-disc pl-6 max-sm:pl-3">
                          <li className="text-sm max-sm:text-[10px]">{sub}</li>
                        </ol>
                      ))}
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>

        <div className="rounded-4xl border p-2 w-[45%]">
          <h2 className="flex text-2xl max-sm:text-sm items-center font-bold gap-2 underline text-blue-500">
            schedule for the day{" "}
            <Calendar size={20} className="text-blue-500" />
          </h2>
          <p className="text-sm max-sm:text-[9px] text-gray-500">
            important but not urgent tasks you want to make time for the day
          </p>
          <form className="flex flex-col gap-2" onSubmit={task2}>
            <div className="flex gap-2 max-sm:gap-1">
              <input
                type="text"
                placeholder="create a task"
                className="rounded-4xl max-sm:rounded-3xl border border-gray-500 p-1 max-sm:text-[10px] max-sm:w-[100px]"
                value={maintask2}
                onChange={(e) => setMaintask2(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSubtask2}
                className="bg-blue-500 rounded-4xl max-sm:rounded-3xl p-1 text-sm max-sm:text-[7px] flex text-white items-center cursor-pointer hover:bg-blue-300 transition-all duration-200 max-sm:w-[60px]"
              >
                create a subtask <Plus size={15} />
              </button>
            </div>
            <div className="flex flex-col">
              {subtask2.map((sub, i) => (
                <div className="flex gap-1 items-center">
                  <input
                    type="text"
                    placeholder={`subtask ${i + 1}`}
                    className="border border-gray-500 rounded-4xl w-1/2 max-sm:text-[10px]"
                    value={sub}
                    onChange={(e) => {
                      const newSubtasks = [...subtask2];
                      newSubtasks[i] = e.target.value;
                      setSubtask2(newSubtasks);
                    }}
                    key={i}
                  />
                  <button
                    type="button"
                    onClick={() => removeSubtask2(i)}
                    className="cursor-pointer"
                  >
                    <X size={20} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-500 rounded-4xl max-sm:rounded-3xl p-2 max-sm:p-1 font-bold flex text-white items-center cursor-pointer hover:bg-blue-300 transition-all duration-200 w-1/4 max-sm:w-1/2 max-sm:text-[10px]"
            >
              submit task
            </button>
          </form>
          <div className="border-t mt-2 p-2 flex flex-col">
            <div className="bg-gray-200 flex flex-col gap-1 rounded-4xl max-sm:rounded-3xl p-2">
              {tasks2
                .filter((t) => t.category === "schedule")
                .map((i) => (
                  <>
                    <h4 className="font-bold underline max-sm:text-sm">
                      {i.maintask}
                    </h4>
                    <div className="flex flex-col">
                      {i.subtasks.map((sub) => (
                        <ol className="list-disc pl-6 max-sm:pl-3">
                          <li className="text-sm max-sm:text-[10px]">{sub}</li>
                        </ol>
                      ))}
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>

        <div className="rounded-4xl border p-2 w-[45%]">
          <h2 className="flex text-2xl max-sm:text-sm items-center font-bold gap-2 underline text-purple-500">
            ask for help <Users size={20} className="text-purple-500" />
          </h2>
          <p className="text-sm max-sm:text-[9px] text-gray-500">
            small tasks you can ask someone else to handle today
          </p>
          <form className="flex flex-col gap-2" onSubmit={task3}>
            <div className="flex gap-2 max-sm:gap-1">
              <input
                type="text"
                placeholder="create a task"
                className="rounded-4xl max-sm:rounded-3xl border border-gray-500 p-1 max-sm:text-[10px] max-sm:w-[100px]"
                value={maintask3}
                onChange={(e) => setMaintask3(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSubtask3}
                className="bg-purple-500 rounded-4xl max-sm:rounded-3xl p-1 text-sm max-sm:text-[7px] flex text-white items-center cursor-pointer hover:bg-purple-300 transition-all duration-200"
              >
                create a subtask <Plus size={15} />
              </button>
            </div>
            <div className="flex flex-col">
              {subtask3.map((sub, i) => (
                <div className="flex gap-1 items-center">
                  <input
                    type="text"
                    placeholder={`subtask ${i + 1}`}
                    className="border border-gray-500 rounded-4xl w-1/2 max-sm:text-[10px]"
                    value={sub}
                    onChange={(e) => {
                      const newSubtasks = [...subtask3];
                      newSubtasks[i] = e.target.value;
                      setSubtask3(newSubtasks);
                    }}
                    key={i}
                  />
                  <button
                    type="button"
                    onClick={() => removeSubtask3(i)}
                    className="cursor-pointer"
                  >
                    <X size={20} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="bg-purple-500 rounded-4xl max-sm:rounded-3xl p-2 max-sm:p-1 font-bold flex text-white items-center cursor-pointer hover:bg-purple-300 transition-all duration-200 w-1/4 max-sm:w-1/2 max-sm:text-[10px]"
            >
              submit task
            </button>
          </form>
          <div className="border-t mt-2 p-2 flex flex-col">
            <div className="bg-gray-200 flex flex-col gap-1 rounded-4xl max-sm:rounded-3xl p-2">
              {tasks3
                .filter((t) => t.category === "ask")
                .map((i) => (
                  <>
                    <h4 className="font-bold underline max-sm:text-sm">
                      {i.maintask}
                    </h4>
                    <div className="flex flex-col">
                      {i.subtasks.map((sub) => (
                        <ol className="list-disc pl-6 max-sm:pl-3">
                          <li className="text-sm max-sm:text-[10px]">{sub}</li>
                        </ol>
                      ))}
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>

        <div className="rounded-4xl border p-2 w-[45%]">
          <h2 className="flex text-2xl max-sm:text-sm items-center font-bold gap-2 underline text-red-500">
            can be postponed <XCircle size={20} className="text-red-500" />
          </h2>
          <p className="text-sm max-sm:text-[9px] text-gray-500">
            {" "}
            distractions and low-value tasks you can skip today or push to
            another day
          </p>
          <form className="flex flex-col gap-2" onSubmit={task4}>
            <div className="flex gap-2 max-sm:gap-1">
              <input
                type="text"
                placeholder="create a task"
                className="rounded-4xl max-sm:rounded-3xl border border-gray-500 p-1 max-sm:text-[10px] max-sm:w-[100px]"
                value={maintask4}
                onChange={(e) => setMaintask4(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSubtask4}
                className="bg-red-500 rounded-4xl max-sm:rounded-3xl p-1 text-sm max-sm:text-[7px] flex text-white items-center cursor-pointer hover:bg-red-300 transition-all duration-200"
              >
                create a subtask <Plus size={15} />
              </button>
            </div>
            <div className="flex flex-col">
              {subtask4.map((sub, i) => (
                <div className="flex gap-1 items-center">
                  <input
                    type="text"
                    placeholder={`subtask ${i + 1}`}
                    className="border border-gray-500 rounded-4xl w-1/2 max-sm:text-[10px]"
                    value={sub}
                    onChange={(e) => {
                      const newSubtasks = [...subtask4];
                      newSubtasks[i] = e.target.value;
                      setSubtask4(newSubtasks);
                    }}
                    key={i}
                  />
                  <button
                    type="button"
                    onClick={() => removeSubtask4(i)}
                    className="cursor-pointer"
                  >
                    <X size={20} className="text-red-500" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="bg-red-500 rounded-4xl max-sm:rounded-3xl p-2 max-sm:p-1 font-bold flex text-white items-center cursor-pointer hover:bg-red-300 transition-all duration-200 w-1/4 max-sm:w-1/2 max-sm:text-[10px]"
            >
              submit task
            </button>
          </form>
          <div className="border-t mt-2 p-2 flex flex-col">
            <div className="bg-gray-200 flex flex-col gap-1 rounded-4xl max-sm:rounded-3xl p-2">
              {tasks4
                .filter((t) => t.category === "postpone")
                .map((i) => (
                  <>
                    <h4 className="font-bold underline max-sm:text-sm">
                      {i.maintask}
                    </h4>
                    <div className="flex flex-col">
                      {i.subtasks.map((sub) => (
                        <ol className="list-disc pl-6 max-sm:pl-3">
                          <li className="text-sm max-sm:text-[10px]">{sub}</li>
                        </ol>
                      ))}
                    </div>
                  </>
                ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={handleDelete}
            className="font-bold bg-red-600 text-white hover:bg-red-400 rounded-4xl p-5 m-5 cursor-pointer"
          >
            delete workday
          </button>
        </div>
      </div>
      <div className="bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Day;
