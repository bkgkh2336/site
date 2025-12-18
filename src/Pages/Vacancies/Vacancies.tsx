import { useEffect, useState } from "react";
import Vacancy, { VacancyProps } from "./Vacancy/Vacancy";
import { Vacancies_ } from "./styled";
import H2 from "../../Components/H2/H2";
import Combobox from "../../Components/Combobox/Combobox";
import H3 from "../../Components/H3/H3";
import Loading from "../../Components/Loading/Loading";

const Vacancies = () => {
    const [jobs, setJobs] = useState<VacancyProps[]>([]);
    const [sortedJobs, setSortedJobs] = useState<VacancyProps[]>([]);
    const [loading, setLoading] = useState(false);

    const list_sort = ['По умолчанию', 'По возрастанию зарплаты', 'По убыванию зарплаты', 'По наименованию должности (по возрастанию)', 'По наименованию должности (по убыванию)'];

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/scrape');
            const data = await response.json();
            setJobs(data);
            setSortedJobs(data);
        } catch (error) {
            console.error('Error fetching scraped data:', error);
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Vacancies_>
            {loading && (
                <Loading />
            )}
            {!loading && jobs.length > 0 &&
                <>
                    <H3>Сортировка:</H3>
                    <Combobox
                        values={list_sort}
                        defaultValue={list_sort[0]}
                        onChange={(e) => {
                            if (!list_sort.includes(e)) {
                                throw new Error(`Произошла ошибка: выбрано значение (${e}) не из списка (${list_sort})`);
                            }
                            switch (e) {
                                case 'По умолчанию':
                                    setSortedJobs([...jobs]);
                                    break;
                                case 'По возрастанию зарплаты':
                                    setSortedJobs([...jobs].sort((a, b) => {
                                        const salaryA = parseFloat(a.salary.split('–')[0].replace(/[^0-9]/g, '')) || 0;
                                        const salaryB = parseFloat(b.salary.split('–')[0].replace(/[^0-9]/g, '')) || 0;
                                        return salaryA - salaryB;
                                    }));
                                    break;
                                case 'По убыванию зарплаты':
                                    setSortedJobs([...jobs].sort((a, b) => {
                                        const salaryA = parseFloat(a.salary.split('–')[0].replace(/[^0-9]/g, '')) || 0;
                                        const salaryB = parseFloat(b.salary.split('–')[0].replace(/[^0-9]/g, '')) || 0;
                                        return salaryB - salaryA;
                                    }));
                                    break;
                                case 'По наименованию должности (по возрастанию)':
                                    setSortedJobs([...jobs].sort((a, b) => a.title.localeCompare(b.title)));
                                    break;
                                case 'По наименованию должности (по убыванию)':
                                    setSortedJobs([...jobs].sort((a, b) => b.title.localeCompare(a.title)));
                                    break;
                            }
                        }}
                    />
                    <H2 style={{ margin: 'auto' }}>Активных вакансий: {jobs.length}</H2>
                    {sortedJobs.map((job, index) => <Vacancy key={index} {...job} index={index} />)}
                </>
            }
        </Vacancies_>
    )
}

export default Vacancies;
