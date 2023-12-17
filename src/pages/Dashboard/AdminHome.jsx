import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../Hooks/UseAxois";
import { FaBook, FaShop, FaUser } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, ResponsiveContainer, Legend } from 'recharts';

import { BsCalendarEventFill } from "react-icons/bs";



const AdminHome = () => {
    const { data, refetch } = useQuery({
        queryKey: ['alldata'],
        queryFn: async () => {
            const res = await axiosSecure.get('/alldata')
            refetch()
            return res.data

        }
    })
    console.log(data)
    const { data: Alldatas = [] } = useQuery({
        queryKey: ['order'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order')
            return res.data
        }
    })
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red'];
    console.log(Alldatas);
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };
    // piechar
    const piechar = Alldatas.map((item) => {
        return { name: item._id, value: item.reveune }
    })
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div>
            <h1 className="text-5xl  mt-10 mb-5">Wellcome Home</h1>
            <div>
                <div className="stats shadow">
                    <div className="stat bg-[#0088FE]">
                        <div className="stat-figure text-secondary">
                            <div className="stat-value">{data?.revene.toFixed(2)}</div>
                            <div className="stat-desc text-2xl font-bold">Revenue</div>
                        </div>
                        <BsCalendarEventFill className="text-5xl" />
                    </div>

                    <div className="stat bg-[#00C49F]">
                        <div className="stat-figure text-secondary">
                            <div className="stat-value">{data?.users}</div>
                            <div className="stat-desc text-2xl font-bold">Customers</div>
                        </div>
                        <FaUser className="text-5xl"></FaUser>
                    </div>

                    <div className="stat bg-[#FF8042]">
                        <div className="stat-figure text-secondary">
                            <div className="stat-value">{data?.menu}</div>
                            <div className="stat-desc text-2xl font-bold">Products</div>
                        </div>
                        <FaBook className="text-5xl" ></FaBook>
                    </div>
                    <div className="stat bg-[#FFBB28]">
                        <div className="stat-figure text-secondary">
                            <div className="stat-value"> {data?.order}</div>
                            <div className="stat-desc text-2xl font-bold">Orders</div>
                        </div>
                        <FaShop className='text-5xl'></FaShop>
                    </div>

                </div>
            </div>
            <div className="my-10 flex ">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={Alldatas}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {Alldatas.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={piechar}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {piechar.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend></Legend>
                        </PieChart>
                    </ResponsiveContainer>

                </div>

            </div>
        </div>
    );
};

export default AdminHome;