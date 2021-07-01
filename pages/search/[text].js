import { useRouter } from 'next/router';
import axios from 'axios';

export default function SearchPage({ items }) {
    const router = useRouter();
    const { text } = router.query;
    console.log(items);

    return <div>Search</div>;
}

export async function getServerSideProps(context) {
    const res = await axios.get(
        `https://www.ricardo.ch/api/frontend/recruitment/search?searchText=${context.params.text}&apiToken=${process.env.apiToken}`
    );

    return {
        props: {
            items: res.data.articles,
        },
    };
}
