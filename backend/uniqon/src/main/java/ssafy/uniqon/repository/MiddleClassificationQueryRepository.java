package ssafy.uniqon.repository;


import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import ssafy.uniqon.controller.CollectionsController;

import java.util.List;

import static ssafy.uniqon.model.QMiddleClassifications.middleClassifications;

@Repository
@RequiredArgsConstructor
@Slf4j
public class MiddleClassificationQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;


    public Page<CollectionsController.middleClassificationListWebResponse> getMiddleClassificationList (Pageable pageable, int mainClassificationId) {

        List<CollectionsController.middleClassificationListWebResponse> list = jpaQueryFactory
                .select(Projections.constructor(CollectionsController.middleClassificationListWebResponse.class,
                        middleClassifications.id,
                        middleClassifications.main.id,
                        middleClassifications.species,
                        middleClassifications.image,
                        middleClassifications.feature))
                .from(middleClassifications)
                .where(
                        middleClassifications.main.id.eq(mainClassificationId)
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(middleClassifications.id.desc())
                .fetch();

        int count = jpaQueryFactory
                .select(middleClassifications.count())
                .from(middleClassifications)
                .where(middleClassifications.id.eq(mainClassificationId))
                .fetch().size();

        return new PageImpl<>(list, pageable, count);
    }
}
