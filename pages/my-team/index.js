import { CalendarOutlined, CheckOutlined, CloseOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_STATUS } from '../../config/Constant';
import  withAppContext  from '../../config/withAppContext';
import { serverCheckIsUserLogin } from '../../helper/AuthActions';
import { convertToSlug, getDate } from '../../helper/Utils';
import useFilters from '../../hooks/useFilters';
import { setChild } from '../../store/common/Action';
import { CHANGE_STATUS_INITIATE, getDSPList } from '../../store/myTeam/Action';
import Panel, { PanelActions, PanelTitle, PanelBody } from '../../components/common/panel';
import { langs } from '../../localization';
const ReduxPagination = dynamic(() => import('../../components/common/pagination'));
const PageTitle = dynamic(() => import('../../components/common/page-title'));
const DocHead = dynamic(() => import('../../components/common/head'));
const ListHeader = dynamic(() => import('../../components/common/listHeader'));
const LoadData = dynamic(() => import('../../components/common/load-data'));

function MyTeam(props) {
    const dispatch = useDispatch();
    let dspList = useSelector((state) => state.myTeam.dspList);
    let loading = useSelector((state) => state.myTeam.loading);
    const filterStroe = useSelector((state) => state.storeFilter);
    const filterName = 'my-team';
    const [filterHook, setFilterHook] = useFilters(filterName);
    const dspListMeta = useSelector((state) => state.myTeam.dspListMeta.pagination);

    useEffect(() => {
        dispatch(setChild(false));
        dispatch(getDSPList());
    }, []);

    useEffect(() => {
        filterStroe[filterName] && dispatch(getDSPList(filterHook));
    }, [filterStroe]);

    /**
     * @name changeStatus
     * @description It changes status of DSP
     * @param {userId, status}
     * @returns {}
     */
    const changeStatus = (userId, status) => {
        const postData = {
            user_id: userId,
            status: status
        };
        dispatch({ type: CHANGE_STATUS_INITIATE, postData });
    };

    return (
        <Fragment>
            <DocHead pageTitle={langs.labels.myDsp} />
            <section className="wrap">
                <PageTitle title={langs.labels.myTeam} />
                <ListHeader
                    count={dspList.length}
                    label={`${langs.labels.team} ${dspList.length <= 1 ? `${langs.labels.member}` : `${langs.labels.members}`}`}
                    sortOption={false}
                    filterOption={false}
                />

                <LoadData data={dspList} loading={loading}>
                    <Row gutter={[16, 0]}>
                        {dspList.map((dsp) => {
                            return (
                                <Fragment key={dsp.full_name}>
                                    <Col md={8} xs={24}>
                                        <Panel size={false}>
                                            <PanelTitle
                                                title={
                                                    <Link
                                                        href={`/my-team/dsp-details/[dspId]/[title]`}
                                                        as={`/my-team/dsp-details/${dsp.id}/${convertToSlug(dsp.full_name)}`}>
                                                        {dsp.full_name}
                                                    </Link>
                                                }
                                                action={[
                                                    {
                                                        onClick: () => window.open(`tel:${dsp.phone_number}`),
                                                        icon: <PhoneOutlined />,
                                                        type: 'link',
                                                        size: 'small',
                                                        className: 'call-btn'
                                                    }
                                                ]}
                                            />
                                            <PanelBody>
                                                <Fragment>
                                                    {dsp.address1 && (
                                                        <Typography.Paragraph
                                                            className={'m-b5 icon-list'}>
                                                            <EnvironmentOutlined /> {langs.labels.address}:{' '}
                                                            {`${`${dsp.address1}, ${dsp.cityName}, ${dsp.stateName} - ${dsp.pincode}`}`}
                                                        </Typography.Paragraph>
                                                    )}
                                                    <Typography.Paragraph className={'m-b5 icon-list'}>
                                                        <CalendarOutlined /> {langs.labels.joiningDate}:{' '}
                                                        <Typography.Text strong>
                                                            {getDate(dsp.created_at)}
                                                        </Typography.Text>
                                                    </Typography.Paragraph>
                                                </Fragment>
                                            </PanelBody>
                                            <PanelActions
                                                actions={
                                                    dsp.status
                                                        ? [
                                                              {
                                                                  onClick: () =>
                                                                      changeStatus(
                                                                          dsp.id,
                                                                          USER_STATUS.DEACTIVE
                                                                      ),
                                                                  label: `${langs.labels.deactive}`,
                                                                  type: 'danger',
                                                                  icon: <CloseOutlined />
                                                              }
                                                          ]
                                                        : [
                                                              {
                                                                  onClick: () =>
                                                                      changeStatus(
                                                                          dsp.id,
                                                                          USER_STATUS.ACTIVE
                                                                      ),
                                                                  label: `${langs.labels.active}`,
                                                                  type: 'primary',
                                                                  icon: <CheckOutlined />
                                                              }
                                                          ]
                                                }
                                            />
                                        </Panel>
                                    </Col>
                                </Fragment>
                            );
                        })}
                    </Row>
                </LoadData>

                <ReduxPagination
                    currentPage={dspListMeta.current_page}
                    totalPages={dspListMeta.total_pages}
                    loading={loading}
                    setPageQuery={setFilterHook}
                    pageQuery={filterHook}
                />
            </section>
        </Fragment>
    );
}

// export async function getServerSideProps({ req, query }) {
//     const props = serverCheckIsUserLogin(req, query);
//     return props;
// }

export default withAppContext(MyTeam);
